export interface NotificationData {
  message: string;
  title?: string;
  action?: string;
  duration?: number;
  type: NotificationType;
  persistent?: boolean;
  showCloseButton?: boolean;
}

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export interface NotificationConfig {
  duration: number;
  horizontalPosition: 'start' | 'center' | 'end' | 'left' | 'right';
  verticalPosition: 'top' | 'bottom';
  panelClass: string[];
}

export interface ActionNotification extends NotificationData {
  actionCallback?: () => void;
}

export const NOTIFICATION_DEFAULTS = {
  duration: 4000,
  horizontalPosition: 'end' as const,
  verticalPosition: 'top' as const,
  showCloseButton: true,
  persistent: false,
};
