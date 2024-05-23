import { Component, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';

import * as fromAuthStore from './auth/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'cognecto';
  isSideNavVisible = false;

  store = inject(Store);
  location = inject(Location);

  ngOnInit(): void {
    this.store.dispatch(fromAuthStore.autoAuthenticate());
    this.isSideNavVisible = this.location.path() !== '/auth';
  }
}
