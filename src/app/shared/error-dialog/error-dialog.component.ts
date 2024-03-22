import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
})
export class ErrorDialogComponent {
  dialogRef = inject(MatDialogRef<ErrorDialogComponent>);
  data = inject(MAT_DIALOG_DATA);
  onClose() {
    this.dialogRef.close(null);
  }
}
