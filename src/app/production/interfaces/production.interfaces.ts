export type ProductionActionViewTypes = 'home' | 'map' | 'side';

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
