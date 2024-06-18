import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import {
  CONFIGURATION_STATE_NAME,
  ConfigurationEffects,
  configurationReducer,
} from './store';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [ConfigurationComponent],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    SharedModule,
    EffectsModule.forFeature([ConfigurationEffects]),
    StoreModule.forFeature(CONFIGURATION_STATE_NAME, configurationReducer),
  ],
})
export class ConfigurationModule {}
