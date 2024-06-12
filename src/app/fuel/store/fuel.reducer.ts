import { createReducer, on, Action } from '@ngrx/store';

import * as fromFuelActions from './fuel.action';
import {
  DepartmentLocation,
  FuelAssetData,
  FuelSource,
  ISubModuleResponse,
} from '../interfaces';
import { IMessageStatus } from 'src/app/shared/interfaces';
import { SuccessMessage } from '../constants';

export interface FuelState {
  isAsideVisible: boolean;
  globalSelectedSubModule: number | null;
  modules: Array<ISubModuleResponse>;
  messageStatus: IMessageStatus | null;
  fuelSources: Array<FuelSource>;
  fuelAssets: { [assetClassName: string]: FuelAssetData[] };
  departmentLocationList: { [type: string]: DepartmentLocation[] };
}

const initialState: FuelState = {
  isAsideVisible: false,
  globalSelectedSubModule: null,
  modules: [],
  messageStatus: null,
  fuelSources: [],
  fuelAssets: {},
  departmentLocationList: {},
};
export const _fuelReducer = createReducer(
  initialState,
  on(
    fromFuelActions.setFuelAside,
    (state, action): FuelState => ({
      ...state,
      isAsideVisible: action.isAsideVisible,
    })
  ),
  on(fromFuelActions.getFuelModulesSuccess, (state, action): FuelState => {
    return {
      ...state,
      modules: action.modules,
    };
  }),
  on(
    fromFuelActions.setFuelModulePreferenceSuccess,
    (state, action): FuelState => {
      return {
        ...state,
        messageStatus: { type: 'success', message: action.status },
        modules: state.modules.map(module => {
          const subModuleChange = action.subModules.find(
            subModule => subModule.subModuleId === module.subModuleId
          );
          if (subModuleChange) {
            return {
              ...module,
              preferred: subModuleChange.isPreferred,
            };
          }
          return module;
        }),
      };
    }
  ),
  on(
    fromFuelActions.setFuelModulePreferenceFailure,
    (state, action): FuelState => {
      return {
        ...state,
        modules: state.modules.map(module => ({ ...module })),
        messageStatus: { type: 'error', message: action.error },
      };
    }
  ),
  on(fromFuelActions.setFuelActiveAction, (state, action): FuelState => {
    return {
      ...state,
      globalSelectedSubModule: action.moduleId,
    };
  }),
  on(fromFuelActions.resetMessageStatus, (state): FuelState => {
    return {
      ...state,
      messageStatus: null,
    };
  }),
  on(fromFuelActions.getFuelSourcesSuccess, (state, action): FuelState => {
    return {
      ...state,
      fuelSources: action.fuelSources,
    };
  }),
  on(fromFuelActions.saveRefuelRecordFailure, (state, action): FuelState => {
    return {
      ...state,
      messageStatus: { type: 'error', message: action.error },
    };
  }),
  on(fromFuelActions.saveRefuelRecordSuccess, (state): FuelState => {
    return {
      ...state,
      globalSelectedSubModule: null,
      messageStatus: {
        type: 'success',
        message: SuccessMessage.REFUEL_RECORD_SAVED,
      },
    };
  }),
  on(fromFuelActions.getFuelAssetsSuccess, (state, action): FuelState => {
    return {
      ...state,
      fuelAssets: action.assets,
    };
  }),
  on(
    fromFuelActions.getDepartemntsAndLocationsSuccess,
    (state, action): FuelState => {
      return {
        ...state,
        departmentLocationList: action.departmentLocationList,
      };
    }
  ),
  on(fromFuelActions.adjustTankValuesFailure, (state, action): FuelState => {
    return {
      ...state,
      messageStatus: { type: 'error', message: action.error },
    };
  }),
  on(fromFuelActions.adjustTankValuesSuccess, (state): FuelState => {
    return {
      ...state,
      globalSelectedSubModule: null,
      messageStatus: {
        type: 'success',
        message: SuccessMessage.FUEL_SOURCE_UPDATED,
      },
    };
  })
);

export function fuelReducer(state: FuelState | undefined, action: Action) {
  return _fuelReducer(state, action);
}
