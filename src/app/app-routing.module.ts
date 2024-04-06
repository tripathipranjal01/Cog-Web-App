import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';

export const APP_ROUTE_NAMES = {
  AUTH: 'auth',
  FLEET: 'fleet',
  FUEL: 'fuel',
  MAINTENANCE: 'maintenance',
  PRODUCTION: 'production',
  CONFIGURATION: 'configuration',
};
const APP_ROUTES: Routes = [
  { path: '', redirectTo: APP_ROUTE_NAMES.AUTH, pathMatch: 'full' },
  {
    path: APP_ROUTE_NAMES.AUTH,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: APP_ROUTE_NAMES.FLEET,
    canActivate: [AuthGuard],
    loadChildren: () => import('./fleet/fleet.module').then(m => m.FleetModule),
  },
  {
    path: APP_ROUTE_NAMES.FUEL,
    canActivate: [AuthGuard],
    loadChildren: () => import('./fuel/fuel.module').then(m => m.FuelModule),
  },
  {
    path: APP_ROUTE_NAMES.MAINTENANCE,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./maintenance/maintenance.module').then(m => m.MaintenanceModule),
  },
  {
    path: APP_ROUTE_NAMES.PRODUCTION,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./production/production.module').then(m => m.ProductionModule),
  },
  {
    path: APP_ROUTE_NAMES.CONFIGURATION,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./configuration/configuration.module').then(
        m => m.ConfigurationModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
