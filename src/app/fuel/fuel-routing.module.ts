import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuelComponent } from './fuel/fuel.component';

export const FUEL_ROUTES_NAMES = {};

const FUEL_ROUTES = [{ path: '', component: FuelComponent }];

@NgModule({
  imports: [RouterModule.forChild(FUEL_ROUTES)],
  exports: [RouterModule],
})
export class FuelRoutingModule {}
