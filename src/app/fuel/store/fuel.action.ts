import { createAction, props } from '@ngrx/store';
import {
  DepartmentLocation,
  FuelAssetData,
  FuelSource,
  RefuelAssetReqObject,
  RefuelRecord,
  RefuelTankReqObject,
} from '../interfaces';
import {
  ISubModulePreferenceRequest,
  ISubModuleResponse,
} from 'src/app/shared/interfaces';

const SET_FUEL_ASIDE_VISIBILITY = '[Fuel] Set Fuel Aside Visibility';

const GET_FUEL_MODULES_START = '[Fuel] Get Fuel Modules Start';

const GET_FUEL_MODULES_SUCCESS = '[Fuel] Get Fuel Modules Success';

const SET_FUEL_MODULE_PREFERENCE = '[Fuel] Set Fuel Module Preference';
const SET_FUEL_MODULE_PREFERENCE_SUCCESS =
  '[Fuel] Set Fuel Module Preference Success';
const SET_FUEL_MODULE_PREFERENCE_FAILURE =
  '[Fuel] Set Fuel Module Preference Failure';
const SET_FUEL_ACTIVE_ACTION = '[Fuel] Set Active Action';
const RESET_FUEL_MESSAGE_STATUS = '[Fuel] Reset message status';
const GET_FUEL_SOURCES = '[Fuel] Get Fuel Sources';
const GET_FUEL_SOURCES_SUCCESS = '[Fuel] Get Fuel Sources Success';
const SAVE_ASSET_REFUEL_RECORD = '[Fuel] Save Asset Refuel Record';
const SAVE_TANK_REFUEL_RECORD = '[Fuel] Save Tank Refuel Record';
const SAVE_REFUEL_RECORD_FAILURE = '[Fuel] Save Refuel Record Failure';
const SAVE_REFUEL_RECORD_SUCCESS = '[Fuel] Save Refuel Record Success';
const GET_FUEL_ASSETS = '[Fuel] Get Assets For Fuel Refill Module';
const GET_FUEL_ASSETS_SUCCESS = '[Fuel] Get Fuel Assets Success';
const GET_DEPARTMENT_LOCATION =
  '[Fuel] Get Departments and Locations For Fuel Refill Module';
const GET_DEPARTMENT_LOCATION_SUCCESS =
  '[Fuel] Get Departments and Locaions Success';
const ADJUST_FUEL_SOURCE_VALUES = '[Fuel] Update Fuel Source Values';
const ADJUST_FUEL_SOURCE_VALUES_SUCCESS =
  '[Fuel] Update Fuel Source Values Success';
const ADJUST_FUEL_SOURCE_VALUES_FAILURE =
  '[Fuel] Update Fuel Source Values Falure';
const INVALID_REQUEST_DATA = '[Fuel] Invalid Request Data';

interface SiteIds {
  siteIds?: number[];
}

export const setFuelAside = createAction(
  SET_FUEL_ASIDE_VISIBILITY,
  props<{ isAsideVisible: boolean }>()
);

export const getFuelModules = createAction(GET_FUEL_MODULES_START);

export const getFuelModulesSuccess = createAction(
  GET_FUEL_MODULES_SUCCESS,
  props<{ modules: ISubModuleResponse[] }>()
);

export const setFuelModulePreference = createAction(
  SET_FUEL_MODULE_PREFERENCE,
  props<{ subModules: ISubModulePreferenceRequest[] }>()
);

export const setFuelModulePreferenceSuccess = createAction(
  SET_FUEL_MODULE_PREFERENCE_SUCCESS,
  props<{ status: string; subModules: ISubModulePreferenceRequest[] }>()
);

export const setFuelModulePreferenceFailure = createAction(
  SET_FUEL_MODULE_PREFERENCE_FAILURE,
  props<{ error: string }>()
);

export const setFuelActiveAction = createAction(
  SET_FUEL_ACTIVE_ACTION,
  props<{ moduleId: number }>()
);

export const resetMessageStatus = createAction(RESET_FUEL_MESSAGE_STATUS);

export const getFuelSources = createAction(GET_FUEL_SOURCES, props<SiteIds>());

export const getFuelSourcesSuccess = createAction(
  GET_FUEL_SOURCES_SUCCESS,
  props<{ fuelSources: FuelSource[] }>()
);

export const saveAssetFuelRefillRecord = createAction(
  SAVE_ASSET_REFUEL_RECORD,
  props<RefuelAssetReqObject>()
);

export const saveTankFuelRefillRecord = createAction(
  SAVE_TANK_REFUEL_RECORD,
  props<RefuelTankReqObject>()
);

export const saveRefuelRecordSuccess = createAction(
  SAVE_REFUEL_RECORD_SUCCESS,
  props<{ savedRecord: RefuelRecord }>()
);

export const saveRefuelRecordFailure = createAction(
  SAVE_REFUEL_RECORD_FAILURE,
  props<{ error: string }>()
);

export const getFuelAssets = createAction(GET_FUEL_ASSETS, props<SiteIds>());

export const getFuelAssetsSuccess = createAction(
  GET_FUEL_ASSETS_SUCCESS,
  props<{ assets: { [assetClassName: string]: FuelAssetData[] } }>()
);

export const getDepartemntsAndLocations = createAction(
  GET_DEPARTMENT_LOCATION,
  props<SiteIds>()
);

export const getDepartemntsAndLocationsSuccess = createAction(
  GET_DEPARTMENT_LOCATION_SUCCESS,
  props<{ departmentLocationList: { [type: string]: DepartmentLocation[] } }>()
);

export const adjustTankValues = createAction(
  ADJUST_FUEL_SOURCE_VALUES,
  props<{
    fuelSourceId: number;
    data: { [key: string]: number };
  }>()
);

export const adjustTankValuesSuccess = createAction(
  ADJUST_FUEL_SOURCE_VALUES_SUCCESS,
  props<{ savedFuelSource: FuelSource }>()
);

export const adjustTankValuesFailure = createAction(
  ADJUST_FUEL_SOURCE_VALUES_FAILURE,
  props<{ error: string }>()
);

export const invalidRequestData = createAction(
  INVALID_REQUEST_DATA,
  props<{ error: string }>()
);
