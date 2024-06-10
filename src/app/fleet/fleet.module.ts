import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FleetRoutingModule } from './fleet-routing.module';
import { FleetComponent } from './fleet/fleet.component';
import { SharedModule } from '../shared/shared.module';
import { HomeFleetComponent } from './home-fleet/home-fleet.component';
import { EffectsModule } from '@ngrx/effects';
import { FleetEffects } from './store';
import { StoreModule } from '@ngrx/store';
import { FLEET_STATE_NAME, fleetReducer } from './store';

@NgModule({
  declarations: [FleetComponent, HomeFleetComponent],
  imports: [
    CommonModule,
    FleetRoutingModule,
    SharedModule,
    EffectsModule.forFeature([FleetEffects]),
    StoreModule.forFeature(FLEET_STATE_NAME, fleetReducer),
  ],
})
export class FleetModule {}
