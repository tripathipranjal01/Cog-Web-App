import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFuelStore from '.';

export const FUEL_STATE_NAME = 'fuel';

export const selectFuelState =
  createFeatureSelector<fromFuelStore.FuelState>(FUEL_STATE_NAME);

export const selectIsAsideVisible = createSelector(
  selectFuelState,
  state => state.isAsideVisible
);

export const selectFuelModules = createSelector(
  selectFuelState,
  state => state.modules
);

export const selectFuelAction = createSelector(
  selectFuelState,
  state => state.globalSelectedSubModule
);

export const selectMessageStatus = createSelector(
  selectFuelState,
  state => state.messageStatus
);
