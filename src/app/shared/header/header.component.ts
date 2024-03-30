import { Component, Input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuthStore from '../../auth/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  store = inject(Store);
  @Input({ required: true }) title: string;
  @Input({ required: true }) icon: string;

  initiateLogout(): void {
    this.store.dispatch(fromAuthStore.logout());
  }
}
