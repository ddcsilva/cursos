import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  private readonly matDialog = inject(MatDialog);

  openDialog(): Observable<boolean | undefined> {
    return this.matDialog.open(ConfirmationDialogComponent).afterClosed();
  }
}
