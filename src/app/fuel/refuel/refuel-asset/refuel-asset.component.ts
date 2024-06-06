import { Component, OnInit } from '@angular/core';
import {
  DepartmentLocation,
  FuelAssetData,
  FuelSource,
  RefuelAssetReqObject,
} from '../../interfaces/fuel.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FuelService } from '../../services/fuel.service';
import * as moment from 'moment';

@Component({
  selector: 'app-refuel-asset',
  templateUrl: './refuel-asset.component.html',
  styleUrls: ['./refuel-asset.component.scss'],
})
export class RefuelAssetComponent implements OnInit {
  fuelSourceList: FuelSource[];
  assetByClassNameMap: { [assetClassName: string]: FuelAssetData[] };
  assetClassNameList: string[] = [];
  departmentList: { id: number; name: string }[];
  locationlist: { id: number; name: string }[];
  filteredAssetList: FuelAssetData[] = [];

  selectedAssetClass: string;
  assetFueledbyMeter = true;

  assetRefillForm: FormGroup = new FormGroup({
    erpRef: new FormControl<string | null>(''),
    timestamp: new FormControl<Date | null>(new Date(), [Validators.required]),
    fuelSource: new FormControl<FuelSource | null>(null, [Validators.required]),
    assetClassName: new FormControl<string | null>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    asset: new FormControl<FuelAssetData | null>(null, [Validators.required]),
    hourMeterReading: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    tankStartReading: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    fuelDispensed: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    tankEndReading: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(0),
    ]),
    department: new FormControl<DepartmentLocation | null>(null, [
      Validators.required,
    ]),
    location: new FormControl<DepartmentLocation | null>(null, [
      Validators.required,
    ]),
    comment: new FormControl<string | null>('', []),
  });
  inputStyle = {
    width: '300px',
    height: '40px',
    display: 'flex',
    'align-items': 'center',
  };

  constructor(private fuelService: FuelService) {}

  ngOnInit(): void {
    this.initializeData(-1);
  }

  initializeData(siteId: number): void {
    this.fuelService.getFuelSources(siteId).subscribe((res: FuelSource[]) => {
      this.fuelSourceList = res.filter(
        (source: FuelSource) => source.type !== 'SUPPLIER_TANK'
      );
    });
    this.fuelService
      .getAssetDataGroupedByAssetClassName(siteId)
      .subscribe((res: { [assetClassName: string]: FuelAssetData[] }) => {
        this.assetByClassNameMap = res;
        this.assetClassNameList = Object.keys(res);
      });
    this.fuelService
      .getDepartmentAndLocations(siteId)
      .subscribe((res: { [type: string]: DepartmentLocation[] }) => {
        if (res['LOCATION'] !== undefined) {
          this.locationlist = res['LOCATION'];
        }
        if (res['DEPARTMENT'] !== undefined) {
          this.departmentList = res['DEPARTMENT'];
        }
      });
  }

  onAssetClassChanged(event: { value: string }): void {
    if (event.value === '' || event.value === null) {
      this.filteredAssetList = [];
      this.assetRefillForm.get('asset')?.setValue(null);
    } else {
      this.filteredAssetList = this.assetByClassNameMap[event.value];
      this.selectedAssetClass = event.value;
    }
  }

  onFuelMeterValueChanged(): void {
    const formData = this.assetRefillForm.value;
    if (this.assetFueledbyMeter) {
      if (formData.tankEndReading > formData.tankStartReading)
        this.assetRefillForm
          .get('fuelDispensed')
          ?.setValue(formData.tankEndReading - formData.tankStartReading);
    } else {
      if (formData.fuelDispensed !== null && formData.fuelDispensed !== 0)
        this.assetRefillForm
          .get('tankEndReading')
          ?.setValue(formData.tankStartReading + formData.fuelDispensed);
    }
  }

  onSubmit() {
    if (this.isDataValid()) {
      const formData = this.assetRefillForm.value;
      const responseObject: RefuelAssetReqObject = {
        timestamp: moment(formData.timestamp).format('yyyy-MM-DD HH:mm'),
        assetId: formData.asset.id,
        fuelSourceId: formData.fuelSource.id,
        hourMeterReading: formData.hourMeterReading,
        tankStartReading: formData.tankStartReading,
        tankEndReading: formData.tankEndReading,
        departmentId: formData.department.id,
        locationId: formData.location.id,
        comment: formData.comment,
      };
      this.fuelService.saveAssetFuelRefillRecord(responseObject).subscribe({
        next: res => {
          if (res !== null) {
            console.log('Saved');
          }
        },
        error: () => {
          console.log('error');
        },
      });
    }
  }

  isDataValid(): boolean {
    if (this.assetRefillForm.invalid) {
      console.log('invalid Data');
      return false;
    } else {
      const data = this.assetRefillForm.value;
      if (data.tankStartReading > data.tankEndReading) {
        console.log('meter data invalid');
        return false;
      } else {
        return true;
      }
    }
  }

  onAssetChanged(event: { value: FuelAssetData }): void {
    if (event.value !== null) {
      this.assetRefillForm
        .get('hourMeterReading')
        ?.setValue(event.value.hourMeterReading);
    } else {
      this.assetRefillForm.get('hourMeterReading')?.setValue(null);
    }
  }

  onFuelSourceChanged(event: { value: FuelSource }): void {
    const tank = event.value;
    if (tank !== null) {
      this.assetRefillForm.get('tankStartReading')?.setValue(tank.meterReading);
      if (tank.fuelByMeter !== undefined) {
        this.assetFueledbyMeter = tank.fuelByMeter;
      }
    } else {
      this.assetRefillForm.get('tankStartReading')?.setValue(null);
    }
  }
}
