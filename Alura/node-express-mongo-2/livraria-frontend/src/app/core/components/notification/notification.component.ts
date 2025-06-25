import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import {
  NotificationData,
  NotificationType,
} from '../../models/notification.model';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="notification-container" [attr.data-type]="data.type">
      <div class="notification-content">
        <div class="notification-icon">
          <mat-icon>{{ getIcon() }}</mat-icon>
        </div>

        <div class="notification-text">
          <div class="notification-title" *ngIf="data.title">
            {{ data.title }}
          </div>
          <div class="notification-message">
            {{ data.message }}
          </div>
        </div>
      </div>

      <div class="notification-actions">
        <button
          *ngIf="data.action"
          mat-button
          class="action-button"
          (click)="onAction()"
        >
          {{ data.action }}
        </button>

        <button
          *ngIf="data.showCloseButton"
          mat-icon-button
          class="close-button"
          (click)="onClose()"
          matTooltip="Fechar"
        >
          <mat-icon>close</mat-icon>
        </button>
      </div>
    </div>
  `,
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<NotificationComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData
  ) {}

  getIcon(): string {
    const icons = {
      [NotificationType.SUCCESS]: 'check_circle',
      [NotificationType.ERROR]: 'error',
      [NotificationType.WARNING]: 'warning',
      [NotificationType.INFO]: 'info',
    };

    return icons[this.data.type];
  }

  onAction(): void {
    this.snackBarRef.dismissWithAction();
  }

  onClose(): void {
    this.snackBarRef.dismiss();
  }
}
