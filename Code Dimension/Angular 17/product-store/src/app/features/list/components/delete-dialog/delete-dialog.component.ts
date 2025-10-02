import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
})
export class DeleteDialogComponent {
  matDialogRef = inject(MatDialogRef);

  onCancel(): void {
    this.matDialogRef.close(false);
  }

  onDelete(): void {
    this.matDialogRef.close(true);
  }
}
