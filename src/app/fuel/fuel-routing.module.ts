import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuelComponent } from './fuel/fuel.component';
import { HomeFuelComponent } from './home-fuel/home-fuel.component';
import { RefuelAssetComponent } from './refuel/refuel-asset/refuel-asset.component';
import { RefuelTankComponent } from './refuel/refuel-tank/refuel-tank.component';
import { RefuelTankTypes } from './constants';

export const FUEL_ROUTES_NAMES = {
  HOME: 'home',
  REFUEL_ASSET: 'refuel-asset',
  REFUEL_MAIN_TANK: 'refuel-main-tank',
  REFUEL_BOWSER: 'refuel-bowser',
  PLANT_BOOKING: 'plant-booking',
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
      {
        path: FUEL_ROUTES_NAMES.REFUEL_ASSET,
        component: RefuelAssetComponent,
        data: {
          breadcrumb: { alias: 'Refuel Asset' },
        },
      },
      {
        path: FUEL_ROUTES_NAMES.REFUEL_MAIN_TANK,
        component: RefuelTankComponent,
        data: {
          breadcrumb: { alias: 'Refuel Main Tank' },
          operationType: RefuelTankTypes.MAIN_TANK,
        },
      },
      {
        path: FUEL_ROUTES_NAMES.REFUEL_BOWSER,
        component: RefuelTankComponent,
        data: {
          breadcrumb: { alias: 'Refuel Bowser' },
          operationType: RefuelTankTypes.BOWSER,
        },
      },
      {
        path: FUEL_ROUTES_NAMES.PLANT_BOOKING,
        component: RefuelTankComponent,
        data: {
          breadcrumb: { alias: 'Plant Booking' },
          operationType: RefuelTankTypes.BOOKING,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(FUEL_ROUTES)],
  exports: [RouterModule],
})
export class FuelRoutingModule {}
