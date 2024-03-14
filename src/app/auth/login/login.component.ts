import { Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { ILogin } from '../interfaces';

@Component({
  selector: 'app-login',
  template: `<app-login-form
    (submitLogin)="initiateLogin($event)"
    )></app-login-form>`,
})
export class LoginComponent {
  store = inject(Store);
  initiateLogin(event: ILogin) {
    this.store.dispatch(fromStore.loginStart(event));
  }
}
