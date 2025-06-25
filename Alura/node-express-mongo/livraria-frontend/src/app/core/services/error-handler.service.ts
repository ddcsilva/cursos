import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  ApiError,
  ErrorResponse,
  ErrorCode,
  ErrorContext,
} from '../models/error.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private notificationService: NotificationService) {}
  /**
   * Processa erros HTTP e retorna uma resposta padronizada
   */
  handleHttpError(
    error: HttpErrorResponse,
    context?: ErrorContext
  ): Observable<never> {
    const errorResponse = this.processHttpError(error, context);

    // Log do erro para monitoramento
    this.logError(errorResponse, context);

    return throwError(() => errorResponse);
  }

  /**
   * Processa diferentes tipos de erro HTTP
   */
  private processHttpError(
    error: HttpErrorResponse,
    context?: ErrorContext
  ): ErrorResponse {
    let errorResponse: ErrorResponse;

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente (rede, etc.)
      errorResponse = this.handleClientError(error.error);
    } else {
      // Erro do lado do servidor
      errorResponse = this.handleServerError(error);
    }

    // Adiciona contexto se disponível
    if (context) {
      errorResponse.technicalMessage += ` [${context.feature}:${context.action}]`;
    }

    return errorResponse;
  }

  /**
   * Trata erros do lado do cliente
   */
  private handleClientError(error: ErrorEvent): ErrorResponse {
    return {
      error: {
        message: error.message,
        status: 0,
      },
      userMessage:
        'Problema de conexão. Verifique sua internet e tente novamente.',
      technicalMessage: `Client Error: ${error.message}`,
      shouldRetry: true,
      errorCode: ErrorCode.NETWORK_ERROR,
    };
  }

  /**
   * Trata erros do lado do servidor
   */
  private handleServerError(error: HttpErrorResponse): ErrorResponse {
    const status = error.status;
    const apiError: ApiError = {
      message: error.error?.message || error.message,
      status: status,
      error: error.error?.error,
      timestamp: new Date().toISOString(),
      path: error.url || undefined,
    };

    switch (status) {
      case 400:
        return {
          error: apiError,
          userMessage:
            'Dados inválidos. Verifique as informações e tente novamente.',
          technicalMessage: `Bad Request: ${apiError.message}`,
          shouldRetry: false,
          errorCode: ErrorCode.VALIDATION_ERROR,
        };

      case 401:
        return {
          error: apiError,
          userMessage: 'Sessão expirada. Faça login novamente.',
          technicalMessage: `Unauthorized: ${apiError.message}`,
          shouldRetry: false,
          errorCode: ErrorCode.UNAUTHORIZED,
        };

      case 403:
        return {
          error: apiError,
          userMessage: 'Você não tem permissão para realizar esta ação.',
          technicalMessage: `Forbidden: ${apiError.message}`,
          shouldRetry: false,
          errorCode: ErrorCode.FORBIDDEN,
        };

      case 404:
        return {
          error: apiError,
          userMessage: 'Recurso não encontrado.',
          technicalMessage: `Not Found: ${apiError.message}`,
          shouldRetry: false,
          errorCode: ErrorCode.NOT_FOUND,
        };

      case 408:
      case 504:
        return {
          error: apiError,
          userMessage: 'Tempo limite excedido. Tente novamente.',
          technicalMessage: `Timeout: ${apiError.message}`,
          shouldRetry: true,
          errorCode: ErrorCode.TIMEOUT,
        };

      case 500:
      case 502:
      case 503:
        return {
          error: apiError,
          userMessage:
            'Erro interno do servidor. Tente novamente em alguns minutos.',
          technicalMessage: `Server Error (${status}): ${apiError.message}`,
          shouldRetry: true,
          errorCode: ErrorCode.SERVER_ERROR,
        };

      default:
        return {
          error: apiError,
          userMessage: 'Ocorreu um erro inesperado. Tente novamente.',
          technicalMessage: `Unknown Error (${status}): ${apiError.message}`,
          shouldRetry: true,
          errorCode: ErrorCode.UNKNOWN,
        };
    }
  }

  /**
   * Log estruturado de erros
   */
  private logError(errorResponse: ErrorResponse, context?: ErrorContext): void {
    const logData = {
      timestamp: new Date().toISOString(),
      errorCode: errorResponse.errorCode,
      status: errorResponse.error.status,
      message: errorResponse.error.message,
      userMessage: errorResponse.userMessage,
      technicalMessage: errorResponse.technicalMessage,
      shouldRetry: errorResponse.shouldRetry,
      context: context,
      url: errorResponse.error.path,
      userAgent: navigator.userAgent,
    };

    // Em produção, você enviaria isso para um serviço de monitoramento
    // como Sentry, LogRocket, etc.
    if (errorResponse.error.status >= 500) {
      console.error('🚨 Server Error:', logData);
    } else if (errorResponse.error.status >= 400) {
      console.warn('⚠️ Client Error:', logData);
    } else {
      console.error('💥 Network Error:', logData);
    }
  }

  /**
   * Formata mensagem de erro para exibição
   */
  getDisplayMessage(errorResponse: ErrorResponse): string {
    return errorResponse.userMessage;
  }

  /**
   * Verifica se o erro permite retry
   */
  shouldRetry(errorResponse: ErrorResponse): boolean {
    return errorResponse.shouldRetry;
  }

  /**
   * Mostra notificação de erro automaticamente
   */
  showErrorNotification(errorResponse: ErrorResponse): void {
    if (errorResponse.shouldRetry) {
      this.notificationService.error(
        errorResponse.userMessage,
        'Erro',
        true // persistent
      );
    } else {
      this.notificationService.error(
        errorResponse.userMessage,
        'Erro',
        false // não persistent
      );
    }
  }

  /**
   * Mostra notificação com opção de retry
   */
  showRetryNotification(
    errorResponse: ErrorResponse,
    retryCallback: () => void
  ): void {
    this.notificationService.showRetryNotification(
      errorResponse.userMessage,
      retryCallback
    );
  }
}
