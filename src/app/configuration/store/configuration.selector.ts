import { createFeatureSelector } from '@ngrx/store';
import * as fromConfigurationStore from '.';

export const CONFIGURATION_STATE_NAME = 'configuration';

export const selectFuelState =
  createFeatureSelector<fromConfigurationStore.ConfigurationState>(
    CONFIGURATION_STATE_NAME
  );
