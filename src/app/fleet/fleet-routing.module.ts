import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FleetComponent } from './fleet/fleet.component';

export const FLEET_ROUTES_NAMES = {};

const FLEET_ROUTES = [{ path: '', component: FleetComponent }];

@NgModule({
  imports: [RouterModule.forChild(FLEET_ROUTES)],
  exports: [RouterModule],
})
export class FleetRoutingModule {}
