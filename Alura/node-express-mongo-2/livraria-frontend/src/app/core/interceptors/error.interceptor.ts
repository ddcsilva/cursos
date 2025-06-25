import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  Observable,
  catchError,
  retry,
  timer,
  mergeMap,
  throwError,
} from 'rxjs';
import { ErrorHandlerService } from '../services/error-handler.service';
import { ErrorCode } from '../models/error.model';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private errorHandler: ErrorHandlerService,
    private notificationService: NotificationService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      // Retry automático para erros específicos
      retry({
        count: this.getRetryCount(req),
        delay: (error: HttpErrorResponse, retryCount: number) => {
          // Só faz retry para erros de rede ou servidor
          if (this.shouldRetry(error)) {
            const delay = this.calculateRetryDelay(retryCount);
            console.log(
              `🔄 Tentativa ${retryCount + 1} em ${delay}ms para ${req.url}`
            );
            return timer(delay);
          }
          // Se não deve fazer retry, propaga o erro imediatamente
          return throwError(() => error);
        },
      }),

      // Captura e trata erros
      catchError((error: HttpErrorResponse) => {
        const context = {
          feature: this.extractFeatureFromUrl(req.url),
          action: this.extractActionFromMethod(req.method),
          data: req.body,
        };

        return this.errorHandler.handleHttpError(error, context);
      })
    );
  }

  /**
   * Determina quantas tentativas fazer com base na requisição
   */
  private getRetryCount(req: HttpRequest<any>): number {
    // GET requests podem ter mais tentativas
    if (req.method === 'GET') {
      return 2;
    }

    // POST/PUT/DELETE são mais sensíveis, menos tentativas
    return 1;
  }

  /**
   * Verifica se deve fazer retry baseado no tipo de erro
   */
  private shouldRetry(error: HttpErrorResponse): boolean {
    // Não faz retry para erros do cliente (4xx)
    if (error.status >= 400 && error.status < 500) {
      return false;
    }

    // Faz retry para erros de rede (status 0) ou servidor (5xx)
    return error.status === 0 || error.status >= 500;
  }

  /**
   * Calcula delay progressivo para retry
   */
  private calculateRetryDelay(retryCount: number): number {
    // Backoff exponencial: 1s, 2s, 4s...
    return Math.min(1000 * Math.pow(2, retryCount), 10000);
  }

  /**
   * Extrai o nome da feature da URL para contexto
   */
  private extractFeatureFromUrl(url: string): string {
    if (url.includes('/livros')) return 'livros';
    if (url.includes('/autores')) return 'autores';
    return 'unknown';
  }

  /**
   * Mapeia método HTTP para ação
   */
  private extractActionFromMethod(method: string): string {
    const actionMap: { [key: string]: string } = {
      GET: 'read',
      POST: 'create',
      PUT: 'update',
      DELETE: 'delete',
      PATCH: 'update',
    };

    return actionMap[method] || 'unknown';
  }
}
