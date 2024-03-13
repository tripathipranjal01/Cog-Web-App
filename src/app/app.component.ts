import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromAuthStore from './auth/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cognecto';

  store = inject(Store);

  // ngOnInit(): void {
  //   this.store.dispatch(fromAuthStore.autoAuthenticate());
  // }
}
