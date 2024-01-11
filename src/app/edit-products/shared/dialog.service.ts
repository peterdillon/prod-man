import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from './confirm/confirm.component';
import { ConfirmDialogData } from './bikes.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmDialogData): Observable<boolean> {
    return this.dialog
      .open(ConfirmComponent, {
        data,
        width: '400px',
        disableClose: true,
      })
      .afterClosed();
  }
}