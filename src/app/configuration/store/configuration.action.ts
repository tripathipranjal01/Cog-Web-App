import { createAction, props } from '@ngrx/store';

// Action Type Constants
const RESET_CONFIGURATION_MESSAGE_STATUS =
  '[Configuration] Reset message status';
const SET_SITE_ASIDE_VISIBILITY = '[Site] Set Site Aside Visibility';

const LOAD_SITES = '[Site] Load Sites';
const LOAD_SITES_SUCCESS = '[Site] Load Sites Success';
const LOAD_SITES_FAILURE = '[Site] Load Sites Failure';

const LOAD_SITE_BY_ID = '[Site] Load Site By Id';
const LOAD_SITE_BY_ID_SUCCESS = '[Site] Load Site By Id Success';
const LOAD_SITE_BY_ID_FAILURE = '[Site] Load Site By Id Failure';

const UPDATE_SITE = '[Site] Update Site';
const UPDATE_SITE_SUCCESS = '[Site] Update Site Success';
const UPDATE_SITE_FAILURE = '[Site] Update Site Failure';

const CREATE_SITE = '[Site] Create Site';
const CREATE_SITE_SUCCESS = '[Site] Create Site Success';
const CREATE_SITE_FAILURE = '[Site] Create Site Failure';

const DELETE_SITE = '[Site] Delete Site';
const DELETE_SITE_SUCCESS = '[Site] Delete Site Success';
const DELETE_SITE_FAILURE = '[Site] Delete Site Failure';

// Configuration Actions
export const resetMessageStatus = createAction(
  RESET_CONFIGURATION_MESSAGE_STATUS
);

// Site Aside Visibility Actions
export const setSiteAside = createAction(
  SET_SITE_ASIDE_VISIBILITY,
  props<{ isAsideVisible: boolean }>()
);

// Site Actions
export const loadSites = createAction(LOAD_SITES);
export const loadSitesSuccess = createAction(
  LOAD_SITES_SUCCESS,
  props<{ sites: any[] }>()
);
export const loadSitesFailure = createAction(
  LOAD_SITES_FAILURE,
  props<{ error: any }>()
);

export const loadSiteById = createAction(
  LOAD_SITE_BY_ID,
  props<{ siteId: any }>()
);

export const loadSiteByIdSuccess = createAction(
  LOAD_SITE_BY_ID_SUCCESS,
  props<{ site: any }>()
);

export const loadSiteByIdFailure = createAction(
  LOAD_SITE_BY_ID_FAILURE,
  props<{ error: any }>()
);

export const updateSite = createAction(
  UPDATE_SITE,
  props<{ siteId: any; siteData: any }>()
);

export const updateSiteSuccess = createAction(
  UPDATE_SITE_SUCCESS,
  props<{ site: any }>()
);

export const updateSiteFailure = createAction(
  UPDATE_SITE_FAILURE,
  props<{ error: any }>()
);

export const createSite = createAction(CREATE_SITE, props<{ siteData: any }>());

export const createSiteSuccess = createAction(
  CREATE_SITE_SUCCESS,
  props<{ site: any }>()
);

export const createSiteFailure = createAction(
  CREATE_SITE_FAILURE,
  props<{ error: any }>()
);

export const deleteSite = createAction(DELETE_SITE, props<{ siteId: any }>());

export const deleteSiteSuccess = createAction(
  DELETE_SITE_SUCCESS,
  props<{ siteId: any }>()
);

export const deleteSiteFailure = createAction(
  DELETE_SITE_FAILURE,
  props<{ error: any }>()
);
