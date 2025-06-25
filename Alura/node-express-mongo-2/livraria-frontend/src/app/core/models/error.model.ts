export interface ApiError {
  message: string;
  status: number;
  error?: string;
  timestamp?: string;
  path?: string;
}

export interface ErrorResponse {
  error: ApiError;
  userMessage: string;
  technicalMessage: string;
  shouldRetry: boolean;
  errorCode: ErrorCode;
}

export enum ErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  TIMEOUT = 'TIMEOUT',
  UNKNOWN = 'UNKNOWN',
}

export interface ErrorContext {
  feature: string;
  action: string;
  data?: any;
}
