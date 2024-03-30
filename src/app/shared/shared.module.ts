import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [ErrorDialogComponent, HeaderComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [CommonModule, ReactiveFormsModule, MaterialModule, HeaderComponent],
})
export class SharedModule {}
