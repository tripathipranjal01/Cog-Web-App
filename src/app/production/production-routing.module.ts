import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductionComponent } from './production/production.component';
import { HomeProductionComponent } from './home-production/home-production.component';

export const PRODUCTION_ROUTES_NAMES = {
  HOME: 'home',
};

const PRODUCTION_ROUTES = [
  {
    path: PRODUCTION_ROUTES_NAMES.HOME,
    component: HomeProductionComponent,
    children: [
      {
        path: '',
        component: ProductionComponent,
        data: { breadcrumb: { alias: 'Production' } },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(PRODUCTION_ROUTES)],
  exports: [RouterModule],
})
export class ProductionRoutingModule {}
