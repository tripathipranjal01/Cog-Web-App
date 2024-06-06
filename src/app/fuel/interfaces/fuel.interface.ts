export interface RefuelAssetReqObject {
  timestamp: string;
  assetId: number;
  hourMeterReading: number;
  fuelSourceId: number;
  tankStartReading: number;
  tankEndReading: number;
  departmentId: number;
  locationId: number;
  comment: string;
}

export interface RefuelTankReqObject {
  timestamp: string;
  hourMeterReading: number;
  fuelSourceId: number;
  tankStartReading: number;
  tankEndReading: number;
  locationId: number;
  comment: string;
}

export interface RefuelRecord {
  id?: number;
  timestamp?: string;
  assetId?: number;
  assetName?: string;
  hourMeterReading?: number;
  fuelSourceId?: number;
  fuelSourceName?: string;
  currentTankBalance?: number;
  tankStartReading?: number;
  tankEndReading?: number;
  departmentId?: number;
  departmentName?: string;
  locationId?: number;
  locationName?: string;
  comment?: string;
}

export interface FuelSource {
  id?: number;
  name?: string;
  balance?: number;
  meterReading?: number;
  type?: string;
  minimumBalance?: string;
  fuelByMeter?: boolean;
  siteId?: number;
  departmentLocationId?: number;
}

export interface FuelAssetData {
  id?: number;
  name?: string;
  assetClassId?: number;
  assetClassName?: string;
  hourMeterReading?: number;
}

export interface DepartmentLocation {
  id: number;
  name: string;
  type: string;
  isteId: number;
}
