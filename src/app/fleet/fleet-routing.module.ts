import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FleetComponent } from './fleet/fleet.component';
import { HomeFleetComponent } from './home-fleet/home-fleet.component';

export const FLEET_ROUTES_NAMES = {
  HOME: 'home',
};

const FLEET_ROUTES = [
  {
    path: FLEET_ROUTES_NAMES.HOME,
    component: HomeFleetComponent,
    children: [
      {
        path: '',
        component: FleetComponent,
        data: { breadcrumb: { alias: 'Fleet' } },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(FLEET_ROUTES)],
  exports: [RouterModule],
})
export class FleetRoutingModule {}
