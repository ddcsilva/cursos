import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../features/list/components/confirmation-dialog/confirmation-dialog.component';
import { filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationDialogService {
  matDialog = inject(MatDialog);

  openDialog(): Observable<boolean> {
    return this.matDialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
      .pipe(filter((answer: boolean) => answer));
  }
}
