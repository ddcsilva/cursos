import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import {
  NotificationData,
  NotificationType,
  NotificationConfig,
  ActionNotification,
  NOTIFICATION_DEFAULTS,
} from '../models/notification.model';
import { NotificationComponent } from '../components/notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   * Mostra notificação de sucesso
   */
  success(
    message: string,
    title?: string,
    duration?: number
  ): MatSnackBarRef<any> {
    return this.show({
      message,
      title,
      type: NotificationType.SUCCESS,
      duration: duration || NOTIFICATION_DEFAULTS.duration,
    });
  }

  /**
   * Mostra notificação de erro
   */
  error(
    message: string,
    title?: string,
    persistent = true
  ): MatSnackBarRef<any> {
    return this.show({
      message,
      title,
      type: NotificationType.ERROR,
      duration: persistent ? 0 : NOTIFICATION_DEFAULTS.duration,
      persistent,
      showCloseButton: true,
    });
  }

  /**
   * Mostra notificação de aviso
   */
  warning(
    message: string,
    title?: string,
    duration?: number
  ): MatSnackBarRef<any> {
    return this.show({
      message,
      title,
      type: NotificationType.WARNING,
      duration: duration || NOTIFICATION_DEFAULTS.duration,
    });
  }

  /**
   * Mostra notificação de informação
   */
  info(
    message: string,
    title?: string,
    duration?: number
  ): MatSnackBarRef<any> {
    return this.show({
      message,
      title,
      type: NotificationType.INFO,
      duration: duration || NOTIFICATION_DEFAULTS.duration,
    });
  }

  /**
   * Mostra notificação com ação customizada
   */
  showWithAction(notification: ActionNotification): MatSnackBarRef<any> {
    const snackBarRef = this.show(notification);

    if (notification.actionCallback) {
      snackBarRef.onAction().subscribe(() => {
        notification.actionCallback!();
      });
    }

    return snackBarRef;
  }

  /**
   * Mostra notificação personalizada
   */
  private show(data: NotificationData): MatSnackBarRef<any> {
    const config = this.buildConfig(data);

    return this.snackBar.openFromComponent(NotificationComponent, {
      data,
      duration: data.duration || NOTIFICATION_DEFAULTS.duration,
      horizontalPosition: config.horizontalPosition,
      verticalPosition: config.verticalPosition,
      panelClass: config.panelClass,
    });
  }

  /**
   * Constrói configuração da notificação
   */
  private buildConfig(data: NotificationData): NotificationConfig {
    const baseClasses = ['notification-snackbar'];
    const typeClass = `notification-${data.type}`;

    return {
      duration: data.duration || NOTIFICATION_DEFAULTS.duration,
      horizontalPosition: NOTIFICATION_DEFAULTS.horizontalPosition,
      verticalPosition: NOTIFICATION_DEFAULTS.verticalPosition,
      panelClass: [...baseClasses, typeClass],
    };
  }

  /**
   * Fecha todas as notificações
   */
  dismissAll(): void {
    this.snackBar.dismiss();
  }

  /**
   * Métodos de conveniência para operações CRUD
   */

  // Sucessos
  created(entityName: string): MatSnackBarRef<any> {
    return this.success(`${entityName} criado com sucesso!`, 'Sucesso');
  }

  updated(entityName: string): MatSnackBarRef<any> {
    return this.success(`${entityName} atualizado com sucesso!`, 'Sucesso');
  }

  deleted(entityName: string): MatSnackBarRef<any> {
    return this.success(`${entityName} excluído com sucesso!`, 'Sucesso');
  }

  // Erros
  createError(entityName: string): MatSnackBarRef<any> {
    return this.error(`Erro ao criar ${entityName}`, 'Erro');
  }

  updateError(entityName: string): MatSnackBarRef<any> {
    return this.error(`Erro ao atualizar ${entityName}`, 'Erro');
  }

  deleteError(entityName: string): MatSnackBarRef<any> {
    return this.error(`Erro ao excluir ${entityName}`, 'Erro');
  }

  loadError(entityName: string): MatSnackBarRef<any> {
    return this.error(`Erro ao carregar ${entityName}`, 'Erro');
  }

  // Validações
  validationError(
    message: string = 'Verifique os dados informados'
  ): MatSnackBarRef<any> {
    return this.warning(message, 'Dados Inválidos');
  }

  // Rede
  networkError(): MatSnackBarRef<any> {
    return this.error(
      'Problema de conexão. Verifique sua internet.',
      'Erro de Conexão'
    );
  }

  // Operações com retry
  showRetryNotification(
    message: string,
    retryCallback: () => void
  ): MatSnackBarRef<any> {
    return this.showWithAction({
      message,
      title: 'Erro',
      type: NotificationType.ERROR,
      action: 'Tentar Novamente',
      actionCallback: retryCallback,
      persistent: true,
      showCloseButton: true,
    });
  }
}
