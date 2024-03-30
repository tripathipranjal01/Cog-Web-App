import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaintenanceComponent } from './maintenance/maintenance.component';

export const MAINTENANCE_ROUTES_NAMES = {};

const MAINTENANCE_ROUTES = [{ path: '', component: MaintenanceComponent }];

@NgModule({
  imports: [RouterModule.forChild(MAINTENANCE_ROUTES)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
