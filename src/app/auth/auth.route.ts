import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const AUTH_ROUTES_NAMES = {
  LOGIN: 'login',
};

export const AUTH_ROUTES: Routes = [{ path: '', component: LoginComponent }];
