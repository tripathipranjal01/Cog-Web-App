import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const APP_ROUTE_NAMES = {
  AUTH: 'auth',
  HOME: 'home',
};
export const APP_ROUTES: Routes = [
  { path: '', redirectTo: APP_ROUTE_NAMES.AUTH, pathMatch: 'full' },
  {
    path: APP_ROUTE_NAMES.AUTH,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: APP_ROUTE_NAMES.HOME,
    component: HomeComponent,
  },
];
