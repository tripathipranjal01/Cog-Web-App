import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { MachineHrComponent } from './machine-hr/machine-hr.component';
import { HomeMntnComponent } from './home-mntn/home-mntn.component';

export const MAINTENANCE_ROUTES_NAMES = {
  HOME: 'home',
  MACHINE: 'machine-hr',
};

const MAINTENANCE_ROUTES = [
  {
    path: MAINTENANCE_ROUTES_NAMES.HOME,
    component: HomeMntnComponent,
    children: [
      {
        path: '',
        component: MaintenanceComponent,
        data: { breadcrumb: { alias: 'Maintenance' } },
      },
      {
        path: MAINTENANCE_ROUTES_NAMES.MACHINE,
        component: MachineHrComponent,
        data: { breadcrumb: { alias: 'Machine hr' } },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(MAINTENANCE_ROUTES)],
  exports: [RouterModule],
})
export class MaintenanceRoutingModule {}
