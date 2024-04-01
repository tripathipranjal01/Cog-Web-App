import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuelRoutingModule } from './fuel-routing.module';
import { FuelComponent } from './fuel/fuel.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FuelComponent],
  imports: [CommonModule, FuelRoutingModule, SharedModule],
})
export class FuelModule {}
