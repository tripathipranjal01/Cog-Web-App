import { createReducer, on, Action } from '@ngrx/store';
import * as ConfigurationActions from './configuration.action';

// Define the state interface
export interface ConfigurationState {
  sites: any[];
  selectedSite: any | null;
  loading: boolean;
  loaded: boolean;
  error: any;
  isAsideVisible: boolean;
}

// Define the initial state
export const initialState: ConfigurationState = {
  sites: [],
  selectedSite: null,
  loading: false,
  loaded: false,
  error: null,
  isAsideVisible: false,
};

// Create the reducer
const _configurationReducer = createReducer(
  initialState,

  // Handle the reset message status action
  on(
    ConfigurationActions.resetMessageStatus,
    (state): ConfigurationState => ({
      ...state,
      error: null,
    })
  ),

  // Handle the set site aside visibility action
  on(
    ConfigurationActions.setSiteAside,
    (state, { isAsideVisible }): ConfigurationState => ({
      ...state,
      isAsideVisible,
    })
  ),

  // Handle the load sites actions
  on(
    ConfigurationActions.loadSites,
    (state): ConfigurationState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null,
    })
  ),
  on(
    ConfigurationActions.loadSitesSuccess,
    (state, { sites }): ConfigurationState => ({
      ...state,
      sites,
      loading: false,
      loaded: true,
    })
  ),
  on(
    ConfigurationActions.loadSitesFailure,
    (state, { error }): ConfigurationState => ({
      ...state,
      loading: false,
      loaded: false,
      error,
    })
  ),

  // Handle the load site by ID actions
  on(
    ConfigurationActions.loadSiteById,
    (state): ConfigurationState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null,
    })
  ),
  on(
    ConfigurationActions.loadSiteByIdSuccess,
    (state, { site }): ConfigurationState => ({
      ...state,
      selectedSite: site,
      loading: false,
      loaded: true,
    })
  ),
  on(
    ConfigurationActions.loadSiteByIdFailure,
    (state, { error }): ConfigurationState => ({
      ...state,
      loading: false,
      loaded: false,
      error,
    })
  ),

  // Handle the update site actions
  on(
    ConfigurationActions.updateSite,
    (state): ConfigurationState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null,
    })
  ),
  on(
    ConfigurationActions.updateSiteSuccess,
    (state, { site }): ConfigurationState => ({
      ...state,
      sites: state.sites.map((s: any) => (s.id === site.id ? site : s)),
      loading: false,
      loaded: true,
    })
  ),
  on(
    ConfigurationActions.updateSiteFailure,
    (state, { error }): ConfigurationState => ({
      ...state,
      loading: false,
      loaded: false,
      error,
    })
  ),

  // Handle the create site actions
  on(
    ConfigurationActions.createSite,
    (state): ConfigurationState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null,
    })
  ),
  on(
    ConfigurationActions.createSiteSuccess,
    (state, { site }): ConfigurationState => ({
      ...state,
      sites: [...state.sites, site],
      loading: false,
      loaded: true,
    })
  ),
  on(
    ConfigurationActions.createSiteFailure,
    (state, { error }): ConfigurationState => ({
      ...state,
      loading: false,
      loaded: false,
      error,
    })
  ),

  // Handle the delete site actions
  on(
    ConfigurationActions.deleteSite,
    (state): ConfigurationState => ({
      ...state,
      loading: true,
      loaded: false,
      error: null,
    })
  ),
  on(
    ConfigurationActions.deleteSiteSuccess,
    (state, { siteId }): ConfigurationState => ({
      ...state,
      sites: state.sites.filter((site: any) => site.id !== siteId),
      loading: false,
      loaded: true,
    })
  ),
  on(
    ConfigurationActions.deleteSiteFailure,
    (state, { error }): ConfigurationState => ({
      ...state,
      loading: false,
      loaded: false,
      error,
    })
  )
);

// Export the reducer function
export function configurationReducer(
  state: ConfigurationState | undefined,
  action: Action
): ConfigurationState {
  return _configurationReducer(state, action);
}
