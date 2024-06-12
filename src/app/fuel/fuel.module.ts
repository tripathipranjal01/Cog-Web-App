import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuelRoutingModule } from './fuel-routing.module';
import { FuelComponent } from './fuel/fuel.component';
import { SharedModule } from '../shared/shared.module';
import { RefuelAssetComponent } from './refuel/refuel-asset/refuel-asset.component';
import { HomeFuelComponent } from './home-fuel/home-fuel.component';
import { FuelEffects } from './store';
import { FUEL_STATE_NAME, fuelReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RefuelTankComponent } from './refuel/refuel-tank/refuel-tank.component';
import { AdjustTankComponent } from './refuel/adjust-tank/adjust-tank.component';

@NgModule({
  declarations: [
    FuelComponent,
    RefuelAssetComponent,
    HomeFuelComponent,
    RefuelTankComponent,
    AdjustTankComponent,
  ],
  imports: [
    CommonModule,
    FuelRoutingModule,
    SharedModule,
    EffectsModule.forFeature([FuelEffects]),
    StoreModule.forFeature(FUEL_STATE_NAME, fuelReducer),
  ],
})
export class FuelModule {}
