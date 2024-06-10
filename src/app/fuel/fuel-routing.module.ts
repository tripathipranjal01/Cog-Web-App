import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuelComponent } from './fuel/fuel.component';
import { HomeFuelComponent } from './home-fuel/home-fuel.component';

export const FUEL_ROUTES_NAMES = {
  HOME: 'home',
};

const FUEL_ROUTES = [
  {
    path: FUEL_ROUTES_NAMES.HOME,
    component: HomeFuelComponent,
    children: [
      {
        path: '',
        component: FuelComponent,
        data: { breadcrumb: { alias: 'Fuel' } },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(FUEL_ROUTES)],
  exports: [RouterModule],
})
export class FuelRoutingModule {}
