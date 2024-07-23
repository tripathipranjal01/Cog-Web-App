import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { HeaderComponent } from './header/header.component';
import { ActionsComponent } from './actions/actions.component';
import { PrimeNgModule } from './primeng.module';
import { CrudComponent } from './ag-grid-renderers/crud/crud.component';
import { AgGridModule } from 'ag-grid-angular';
import { ChartCardComponent } from './chart-card/chart-card.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { LabelValueCardComponent } from './templates/label-value-card/label-value-card.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { BreadcrumbService } from 'xng-breadcrumb';
import { SelectableCardComponent } from './selectable-card/selectable-card.component';
import { TruncateTextPipe } from '../core/pipes/truncate-text.pipe';

@NgModule({
  declarations: [
    ErrorDialogComponent,
    HeaderComponent,
    ActionsComponent,
    CrudComponent,
    ChartCardComponent,
    LabelValueCardComponent,
    SelectableCardComponent,
    TruncateTextPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNgModule,
    AgGridModule,
    HighchartsChartModule,
    BreadcrumbModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    ActionsComponent,
    PrimeNgModule,
    AgGridModule,
    ChartCardComponent,
    HighchartsChartModule,
    LabelValueCardComponent,
    SelectableCardComponent,
  ],
  providers: [BreadcrumbService],
})
export class SharedModule {}
