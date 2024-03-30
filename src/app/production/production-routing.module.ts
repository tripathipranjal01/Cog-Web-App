import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductionComponent } from './production/production.component';

export const FUEL_ROUTES_NAMES = {};

const PRODUCTION_ROUTES = [{ path: '', component: ProductionComponent }];

@NgModule({
  imports: [RouterModule.forChild(PRODUCTION_ROUTES)],
  exports: [RouterModule],
})
export class ProductionRoutingModule {}
