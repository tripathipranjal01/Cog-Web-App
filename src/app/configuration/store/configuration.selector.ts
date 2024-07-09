import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromConfigurationStore from '.';

// Define the feature state name
export const CONFIGURATION_STATE_NAME = 'configuration';

// Create feature selector
export const selectConfigurationState =
  createFeatureSelector<fromConfigurationStore.ConfigurationState>(
    CONFIGURATION_STATE_NAME
  );

// Create individual selectors
export const selectAllSites = createSelector(
  selectConfigurationState,
  (state: fromConfigurationStore.ConfigurationState) => state.sites
);

export const selectSelectedSite = createSelector(
  selectConfigurationState,
  (state: fromConfigurationStore.ConfigurationState) => state.selectedSite
);

export const selectLoading = createSelector(
  selectConfigurationState,
  (state: fromConfigurationStore.ConfigurationState) => state.loading
);

export const selectLoaded = createSelector(
  selectConfigurationState,
  (state: fromConfigurationStore.ConfigurationState) => state.loaded
);

export const selectError = createSelector(
  selectConfigurationState,
  (state: fromConfigurationStore.ConfigurationState) => state.error
);

export const selectIsAsideVisible = createSelector(
  selectConfigurationState,
  (state: fromConfigurationStore.ConfigurationState) => state.isAsideVisible
);

export const selectFilteredSites = (filter: string) =>
  createSelector(selectAllSites, (sites: any[]) => {
    if (!filter) {
      return sites;
    }
    const filterTextLower = filter.toLowerCase();
    return sites.filter((site: any) =>
      site.name.toLowerCase().includes(filterTextLower)
    );
  });
export function selectCurrentSite(selectCurrentSite: any) {
  throw new Error('Function not implemented.');
}
