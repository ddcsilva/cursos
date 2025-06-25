import { ErrorHandler, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from '../interceptors/error.interceptor';
import { GlobalErrorHandler } from '../handlers/global-error.handler';

/**
 * Providers para o sistema de tratamento de erros
 */
export const ERROR_PROVIDERS: Provider[] = [
  // HTTP Error Interceptor
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  },

  // Global Error Handler
  {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler,
  },
];
