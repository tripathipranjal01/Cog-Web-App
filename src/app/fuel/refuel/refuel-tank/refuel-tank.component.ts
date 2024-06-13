import { Component, OnInit, inject } from '@angular/core';
import {
  FuelAssetData,
  FuelSource,
  RefuelTankReqObject,
} from '../../interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FuelService } from '../../services';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { ErrorMessage, RefuelTankTypes } from '../../constants';

@Component({
  selector: 'app-refuel-tank',
  templateUrl: './refuel-tank.component.html',
  styleUrls: ['./refuel-tank.component.scss'],
})
export class RefuelTankComponent implements OnInit {
  store = inject(Store);

  fuelSourceList: FuelSource[];
  assetByClassNameMap: { [assetClassName: string]: FuelAssetData[] };
  assetClassNameList: string[] = [];
  departmentList: { id: number; name: string }[];
  locationlist: { id: number; name: string }[];
  filteredAssetList: FuelAssetData[] = [];

  fueledbyMeter = true;
  fuelQuantity = 0;

  tankRefillForm: FormGroup = new FormGroup({
    erpRef: new FormControl<string | null>(''),
    timestamp: new FormControl<Date | null>(new Date(), [Validators.required]),
    fuelSource: new FormControl<FuelSource | null>(null, [Validators.required]),
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
    destinationTank: new FormControl<FuelSource | null>(null, [
      Validators.required,
    ]),
    comment: new FormControl<string | null>('', []),
  });
  inputStyle = {
    width: '18vw',
    height: '6vh',
    display: 'flex',
    'align-items': 'center',
  };
  supplierTank = {
    id: 1,
    name: 'Supplier Tank',
  };

  sourceList: FuelSource[] = [];
  destinationList: FuelSource[] = [];

  tankRefuelOperationTypes = RefuelTankTypes;
  operationType = this.tankRefuelOperationTypes.MAIN_TANK;

  private fuelSourcesSub$: Subscription;
  constructor(
    private fuelService: FuelService,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe(data => {
      if (data['operationType'] !== undefined)
        this.operationType = data['operationType'];
    });
  }

  ngOnInit(): void {
    this.initializeData(-1);
  }

  initializeData(siteId: number): void {
    this.fuelSourcesSub$ = this.store
      .select(fromStore.selectFuelSources)
      .subscribe(fuelSources => {
        this.fuelSourceList = fuelSources;
        switch (this.operationType) {
          case this.tankRefuelOperationTypes.BOWSER:
            this.refuelBowser(fuelSources);
            break;
          case this.tankRefuelOperationTypes.MAIN_TANK:
            this.refuelMainTank(fuelSources);
            break;
          case this.tankRefuelOperationTypes.BOOKING:
            this.plantBooking(fuelSources);
        }
      });
    this.store.dispatch(fromStore.getFuelSources({ siteId: siteId }));
  }

  refuelBowser(fuelSourcesList: FuelSource[]): void {
    const sources = fuelSourcesList.filter(
      (tank: FuelSource) => tank.type === 'MAIN_TANK'
    );
    this.sourceList = sources;
    if (sources.length === 1) {
      this.tankRefillForm.get('fuelSource')?.setValue(sources[0]);
      this.tankRefillForm
        .get('tankStartReading')
        ?.setValue(sources[0].meterReading);
      this.fueledbyMeter =
        sources[0].fuelByMeter === undefined ? true : sources[0].fuelByMeter;
    }
    this.destinationList = fuelSourcesList.filter(
      (tank: FuelSource) => tank.type === 'BOWSER'
    );
  }

  refuelMainTank(fuelSourcesList: FuelSource[]): void {
    this.tankRefillForm.get('fuelSource')?.setValue(this.supplierTank);
    this.tankRefillForm.get('tankStartReading')?.setValue(0);
    this.fueledbyMeter = false;
    this.destinationList = fuelSourcesList.filter(
      (tank: FuelSource) => tank.type === 'MAIN_TANK'
    );
  }

  plantBooking(fuelSourcesList: FuelSource[]): void {
    this.sourceList = fuelSourcesList.filter(
      (tank: FuelSource) => tank.bookingEnabled
    );
  }

  onFuelMeterValueChanged(): void {
    const formData = this.tankRefillForm.value;
    if (this.fueledbyMeter) {
      const liters =
        formData.tankEndReading > formData.tankStartReading
          ? formData.tankEndReading - formData.tankStartReading
          : 0;
      this.tankRefillForm.get('fuelDispensed')?.setValue(liters);
      this.fuelQuantity = liters;
    } else {
      if (formData.fuelDispensed !== null && formData.fuelDispensed !== 0)
        this.tankRefillForm
          .get('tankEndReading')
          ?.setValue(formData.tankStartReading + formData.fuelDispensed);
    }
  }

  onSubmit() {
    if (this.isDataValid()) {
      const formData = this.tankRefillForm.value;
      const responseObject: RefuelTankReqObject = {
        timestamp: formData.timestamp.toISOString(),
        fuelSourceId: formData.fuelSource.id,
        tankStartReading: formData.tankStartReading,
        tankEndReading: formData.tankEndReading,
        locationId: formData.destinationTank.departmentLocationId,
        comment: formData.comment,
        erpRef: formData.erpRef,
      };
      this.store.dispatch(fromStore.saveTankFuelRefillRecord(responseObject));
    }
  }

  isDataValid(): boolean {
    if (this.tankRefillForm.invalid) {
      this.store.dispatch(
        fromStore.invalidRequestData({ error: ErrorMessage.INVALID_DATA })
      );
      return false;
    } else {
      const data = this.tankRefillForm.value;
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

  onFuelSourceChanged(event: { value: FuelSource }): void {
    const tank = event.value;
    if (tank !== null) {
      this.tankRefillForm.get('tankStartReading')?.setValue(tank.meterReading);
      if (tank.fuelByMeter !== undefined) {
        this.fueledbyMeter = tank.fuelByMeter;
      }
    } else {
      this.tankRefillForm.get('tankStartReading')?.setValue(null);
    }
    this.onFuelMeterValueChanged();
    if (this.operationType === this.tankRefuelOperationTypes.BOOKING) {
      this.tankRefillForm.get('destinationTank')?.setValue(tank);
    }
  }
}
