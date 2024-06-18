import { Injectable, inject } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ConfigurationService } from '../services';

@Injectable()
export class ConfigurationEffects {
  action$ = inject(Actions);
  store = inject(Store);
  configurationService = inject(ConfigurationService);
}
