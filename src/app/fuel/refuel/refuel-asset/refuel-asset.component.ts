import { Component, OnInit, inject } from '@angular/core';
import {
  DepartmentLocation,
  FuelAssetData,
  FuelSource,
  RefuelAssetReqObject,
} from '../../interfaces/fuel.interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FuelService } from '../../services/fuel.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { ErrorMessage } from '../../constants';

@Component({
  selector: 'app-refuel-asset',
  templateUrl: './refuel-asset.component.html',
  styleUrls: ['./refuel-asset.component.scss'],
})
export class RefuelAssetComponent implements OnInit {
  store = inject(Store);

  fuelSourceList: FuelSource[];
  assetByClassNameMap: { [assetClassName: string]: FuelAssetData[] };
  assetClassNameList: string[] = [];
  departmentList: { id: number; name: string }[];
  locationlist: { id: number; name: string }[];
  filteredAssetList: FuelAssetData[] = [];

  selectedAssetClass: string;
  assetFueledbyMeter = true;
  fuelQuantity = 0;

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
    width: '18vw',
    height: '3vw',
    display: 'flex',
    'align-items': 'center',
  };

  private fuelSourcesSub$: Subscription;
  private fuelAssetsSub$: Subscription;
  private departmentLocationSub$: Subscription;

  constructor(private fuelService: FuelService) {}

  ngOnInit(): void {
    this.fuelSourcesSub$ = this.store
      .select(fromStore.selectFuelSources)
      .subscribe(fuelSources => {
        this.fuelSourceList = fuelSources;
      });
    this.store.dispatch(fromStore.getFuelSources({}));
    this.fuelAssetsSub$ = this.store
      .select(fromStore.selectFuelAssets)
      .subscribe(assets => {
        this.assetByClassNameMap = assets;
        this.assetClassNameList = Object.keys(assets);
      });
    this.store.dispatch(fromStore.getFuelAssets({}));
    this.departmentLocationSub$ = this.store
      .select(fromStore.selectDepartmentLocations)
      .subscribe(departmentLocation => {
        if (departmentLocation['LOCATION'] !== undefined) {
          this.locationlist = departmentLocation['LOCATION'];
        }
        if (departmentLocation['DEPARTMENT'] !== undefined) {
          this.departmentList = departmentLocation['DEPARTMENT'];
        }
      });
    this.store.dispatch(fromStore.getDepartemntsAndLocations({}));
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
      const liters =
        formData.tankEndReading > formData.tankStartReading
          ? formData.tankEndReading - formData.tankStartReading
          : 0;
      this.assetRefillForm.get('fuelDispensed')?.setValue(liters);
      this.fuelQuantity = liters;
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
        timestamp: formData.timestamp.toISOString(),
        assetId: formData.asset.id,
        fuelSourceId: formData.fuelSource.id,
        hourMeterReading: formData.hourMeterReading,
        tankStartReading: formData.tankStartReading,
        tankEndReading: formData.tankEndReading,
        departmentId: formData.department.id,
        locationId: formData.location.id,
        comment: formData.comment,
        erpRef: formData.erpRef,
      };
      this.store.dispatch(fromStore.saveAssetFuelRefillRecord(responseObject));
    }
  }

  isDataValid(): boolean {
    if (this.assetRefillForm.invalid) {
      this.store.dispatch(
        fromStore.invalidRequestData({ error: ErrorMessage.INVALID_DATA })
      );
      return false;
    } else {
      const data = this.assetRefillForm.value;
      if (data.tankStartReading > data.tankEndReading) {
        this.store.dispatch(
          fromStore.invalidRequestData({
            error: ErrorMessage.INVALID_TANK_METER_READING,
          })
        );
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
    this.onFuelMeterValueChanged();
  }
}
