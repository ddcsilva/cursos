import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
  matDialogRef = inject(MatDialogRef);

  onCancel(): void {
    this.matDialogRef.close(false);
  }

  onDelete(): void {
    this.matDialogRef.close(true);
  }
}
