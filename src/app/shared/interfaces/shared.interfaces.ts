export interface IAllModulesResponse {
  moduleId: number;
  moduleName: string;
  sequenceNumber: number;
  moduleIconPath: null;
  moduleType: string;
  subModules: null;
}

export interface ISubModuleResponse {
  subModuleId: number;
  subModuleName: string;
  sequenceNumber: number;
  subModuleType: string;
  preferred: boolean;
  icon: string;
  subModulePath: string;
}

export interface ISubModulePreferenceRequest {
  subModuleId: number;
  isPreferred: boolean;
}

export interface IMessageStatus {
  type: string;
  message: string;
}

interface selectableCardColumn {
  label?: string;
  value: string;
  color?: string;
  class?: string;
}

export interface ISelectableCard {
  id: number;
  header: string;
  isSelected: boolean;
  columns: selectableCardColumn[];
}
