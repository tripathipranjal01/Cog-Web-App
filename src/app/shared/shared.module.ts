import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { HeaderComponent } from './header/header.component';
import { ActionsComponent } from './actions/actions.component';
import { PrimeNgModule } from './primeng.module';
import { CrudComponent } from './ag-grid-renderers/crud/crud.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    HeaderComponent,
    ActionsComponent,
    CrudComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNgModule,
    AgGridModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    ActionsComponent,
    PrimeNgModule,
    AgGridModule,
  ],
  providers: [],
})
export class SharedModule {}
