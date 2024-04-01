import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { HeaderComponent } from './header/header.component';
import { ActionsComponent } from './actions/actions.component';

@NgModule({
  declarations: [ErrorDialogComponent, HeaderComponent, ActionsComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, FormsModule],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    HeaderComponent,
    ActionsComponent,
  ],
})
export class SharedModule {}
