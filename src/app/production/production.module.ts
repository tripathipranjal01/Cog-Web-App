import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionRoutingModule } from './production-routing.module';
import { ProductionComponent } from './production/production.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProductionComponent],
  imports: [CommonModule, ProductionRoutingModule, SharedModule],
})
export class ProductionModule {}
