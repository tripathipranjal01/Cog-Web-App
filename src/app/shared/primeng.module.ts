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
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
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
  DialogModule,
  ToastModule,
  ConfirmDialogModule,
  DropdownModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
  providers: [MessageService, ConfirmationService],
})
export class PrimeNgModule {}
