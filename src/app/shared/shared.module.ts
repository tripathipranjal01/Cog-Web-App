import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@NgModule({
  declarations: [ErrorDialogComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [CommonModule, ReactiveFormsModule, MaterialModule],
})
export class SharedModule {}
