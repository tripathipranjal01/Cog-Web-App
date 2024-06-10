import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProductionStore from '.';

export const PRODUCTION_STATE_NAME = 'production';

export const selectProductionState =
  createFeatureSelector<fromProductionStore.ProductionState>(
    PRODUCTION_STATE_NAME
  );

export const selectIsAsideVisible = createSelector(
  selectProductionState,
  state => state.isAsideVisible
);

export const selectProductionModules = createSelector(
  selectProductionState,
  state => state.modules
);

export const selectProductionAction = createSelector(
  selectProductionState,
  state => state.globalSelectedSubModule
);

export const selectMessageStatus = createSelector(
  selectProductionState,
  state => state.messageStatus
);
