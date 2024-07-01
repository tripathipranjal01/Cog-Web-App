import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FuelSource } from '../../interfaces';
import { FuelService } from '../../services';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { ErrorMessage } from '../../constants';

@Component({
  selector: 'app-adjust-tank',
  templateUrl: './adjust-tank.component.html',
  styleUrls: ['./adjust-tank.component.scss'],
})
export class AdjustTankComponent implements OnInit {
  store = inject(Store);
  tankAdjustForm: FormGroup = new FormGroup({
    fuelSource: new FormControl<FuelSource | null>(null, [Validators.required]),
    tankMeterReading: new FormControl<number | null>(null, [Validators.min(0)]),
    tankBalance: new FormControl<number | null>(null, [Validators.min(0)]),
  });
  inputStyle = {
    width: '15vw',
    height: '6vh',
    display: 'flex',
    'align-items': 'center',
  };

  fuelSourceList: FuelSource[] = [];
  selectedFuelSource: FuelSource = {
    balance: 0,
    meterReading: 0,
  };

  constructor(
    private fuelService: FuelService,
    private ref: DynamicDialogRef
  ) {}

  fuelSourcesSub$: Subscription;

  ngOnInit(): void {
    this.initializeData(-1);
  }

  initializeData(siteId: number): void {
    this.fuelSourcesSub$ = this.store
      .select(fromStore.selectFuelSources)
      .subscribe(fuelSources => {
        this.fuelSourceList = fuelSources;
      });
    this.store.dispatch(fromStore.getFuelSources({}));
  }

  onFuelSourceChanged(event: { value: FuelSource }): void {
    if (event.value !== null) {
      const source = event.value;
      this.selectedFuelSource = {
        balance: source.balance,
        meterReading: source.meterReading,
      };
    } else {
      this.selectedFuelSource = {
        balance: 0,
        meterReading: 0,
      };
    }
  }

  onSubmit() {
    const formData = this.tankAdjustForm.value;
    if (
      !this.tankAdjustForm.invalid &&
      (formData.tankMeterReading !== null || formData.tankBalance !== null)
    ) {
      const responseObject = {
        fuelSourceId: formData.fuelSource.id,
        data: this.getPatchData(formData),
      };
      this.store.dispatch(fromStore.adjustTankValues(responseObject));
      this.closeDialog();
    } else {
      this.store.dispatch(
        fromStore.invalidRequestData({ error: ErrorMessage.NO_CONTENT })
      );
    }
  }

  getPatchData(formData: { tankMeterReading: number; tankBalance: number }): {
    [key: string]: number;
  } {
    const tempdata: { [key: string]: number } = {
      meterReading: formData.tankMeterReading,
      balance: formData.tankBalance,
    };
    Object.keys(tempdata).forEach(key => {
      if (tempdata[key] === null) {
        delete tempdata[key];
      }
    });
    return tempdata;
  }

  closeDialog() {
    this.ref.close();
  }
}
