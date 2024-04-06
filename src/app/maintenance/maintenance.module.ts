import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaintenanceComponent } from './maintenance/maintenance.component';

import {
  MAINTENANCE_STATE_NAME,
  maintenanceReducer,
  MaintenanceEffects,
} from './store';
import { MachineHrComponent } from './machine-hr/machine-hr.component';
import { HomeMntnComponent } from './home-mntn/home-mntn.component';

@NgModule({
  declarations: [MaintenanceComponent, MachineHrComponent, HomeMntnComponent],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    SharedModule,
    EffectsModule.forFeature([MaintenanceEffects]),
    StoreModule.forFeature(MAINTENANCE_STATE_NAME, maintenanceReducer),
  ],
})
export class MaintenanceModule {}

/*  */
