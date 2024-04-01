import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaintenanceComponent } from './maintenance/maintenance.component';

import { MAINTENANCE_STATE_NAME, maintenanceReducer } from './store';

@NgModule({
  declarations: [MaintenanceComponent],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    SharedModule,
    StoreModule.forFeature(MAINTENANCE_STATE_NAME, maintenanceReducer),
  ],
})
export class MaintenanceModule {}

/*  */
