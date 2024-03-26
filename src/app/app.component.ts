import { Component, inject, OnInit } from '@angular/core';
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

  store = inject(Store);
  matIconReg = inject(MatIconRegistry);

  ngOnInit(): void {
    this.store.dispatch(fromAuthStore.autoAuthenticate());
    this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
  }
}
