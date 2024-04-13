import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';

import * as fromAuthStore from './auth/store';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'cognecto';
  isLoginPage = true;

  store = inject(Store);
  matIconReg = inject(MatIconRegistry);
  location = inject(Location);

  ngOnInit(): void {
    this.store.dispatch(fromAuthStore.autoAuthenticate());
    this.isLoginPage = this.location.path() === '/auth';
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
  }
}
