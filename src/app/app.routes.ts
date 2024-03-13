import { Routes } from '@angular/router';

export const APP_ROUTE_NAMES = {
  AUTH: 'auth',
};
export const APP_ROUTES: Routes = [
  { path: '', redirectTo: APP_ROUTE_NAMES.AUTH, pathMatch: 'full' },
  {
    path: APP_ROUTE_NAMES.AUTH,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
];
