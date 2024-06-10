import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromFleetStore from '.';

export const FLEET_STATE_NAME = 'fleet';

export const selectFleetState =
  createFeatureSelector<fromFleetStore.FleetState>(FLEET_STATE_NAME);

export const selectIsAsideVisible = createSelector(
  selectFleetState,
  state => state.isAsideVisible
);

export const selectFleetModules = createSelector(
  selectFleetState,
  state => state.modules
);

export const selectFleetAction = createSelector(
  selectFleetState,
  state => state.globalSelectedSubModule
);

export const selectMessageStatus = createSelector(
  selectFleetState,
  state => state.messageStatus
);
