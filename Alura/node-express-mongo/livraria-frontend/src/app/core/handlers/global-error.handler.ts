import { ErrorHandler, Injectable, NgZone } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private zone: NgZone) {}

  handleError(error: any): void {
    // Executa fora da zona do Angular para evitar loops
    this.zone.runOutsideAngular(() => {
      this.logGlobalError(error);
    });

    // Em desenvolvimento, mantém o comportamento padrão
    if (!this.isProduction()) {
      console.error('🔥 Global Error:', error);
    }
  }

  private logGlobalError(error: any): void {
    const errorInfo = {
      timestamp: new Date().toISOString(),
      message: error?.message || 'Unknown error',
      stack: error?.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      type: 'GLOBAL_ERROR',
    };

    // Em produção, envie para serviço de monitoramento
    if (this.isProduction()) {
      this.sendToMonitoringService(errorInfo);
    } else {
      console.group('🚨 Global Error Details');
      console.error('Error:', error);
      console.table(errorInfo);
      console.groupEnd();
    }
  }

  private sendToMonitoringService(errorInfo: any): void {
    // Aqui você integraria com Sentry, LogRocket, etc.
    // Exemplo:
    // Sentry.captureException(error, { extra: errorInfo });

    // Por enquanto, apenas log
    console.error('Production Error:', errorInfo);
  }

  private isProduction(): boolean {
    return false; // Substitua pela lógica real de detecção de ambiente
  }
}
