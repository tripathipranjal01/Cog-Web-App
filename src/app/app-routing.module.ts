import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { HomeComponent } from './home/home.component';

export const APP_ROUTE_NAMES = {
  AUTH: 'auth',
  HOME: 'home',
};
const APP_ROUTES: Routes = [
  { path: '', redirectTo: APP_ROUTE_NAMES.AUTH, pathMatch: 'full' },
  {
    path: APP_ROUTE_NAMES.AUTH,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: APP_ROUTE_NAMES.HOME,
    component: HomeComponent,
    canActivate: [AuthGuard],
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
