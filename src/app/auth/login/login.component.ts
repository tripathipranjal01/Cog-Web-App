import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { ILogin } from '../interfaces';

@Component({
  selector: 'app-login',
  template: `<app-login-form
    (submitLogin)="initiateLogin($event)"
    [isSpinner]="loginSpinnerLoading"></app-login-form>`,
})
export class LoginComponent implements OnInit, OnDestroy {
  store = inject(Store);
  loginSpinnerLoading: boolean;
  private authSub$: Subscription;

  ngOnInit(): void {
    this.store.dispatch(fromStore.autoAuthenticate());
    this.authSub$ = this.store
      .select(fromStore.selectAuthState)
      .subscribe(authState => {
        this.loginSpinnerLoading = authState.loading;
      });
  }
  initiateLogin(event: ILogin) {
    this.store.dispatch(fromStore.loginStart(event));
  }

  ngOnDestroy(): void {
    if (this.authSub$) {
      this.authSub$.unsubscribe();
    }
  }
}
