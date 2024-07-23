import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CarouselModule } from 'primeng/carousel';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CheckboxModule } from 'primeng/checkbox';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule } from 'primeng/paginator';

const modules = [
  FormsModule,
  ReactiveFormsModule,
  ButtonModule,
  CarouselModule,
  InputTextModule,
  InputNumberModule,
  PasswordModule,
  DividerModule,
  TabMenuModule,
  ToggleButtonModule,
  OverlayPanelModule,
  CheckboxModule,
  BadgeModule,
  TooltipModule,
  DropdownModule,
  CalendarModule,
  DialogModule,
  ToastModule,
  DynamicDialogModule,
  ConfirmDialogModule,
  PaginatorModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  providers: [MessageService, DialogService, ConfirmationService],
})
export class PrimeNgModule {}
