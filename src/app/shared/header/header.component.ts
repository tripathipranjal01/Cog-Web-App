import { Component, Input, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import * as fromAuthStore from '../../auth/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  home: MenuItem;
  actionItems: MenuItem[];

  store = inject(Store);
  @Input({ required: true }) title: string;
  @Input({ required: true }) icon: string;

  ngOnInit() {
    this.items = [{ label: 'Maintenance' }, { label: 'Service' }];
    this.home = { icon: 'pi pi-home', routerLink: '/fleet' };
    this.actionItems = [
      { label: 'Report', icon: 'fa-light fa-file-chart-pie' },
      { label: 'Task', icon: 'fa-light fa-server' },
      { label: 'Logbook', icon: 'fa-light fa-notebook' },
    ];
  }

  initiateLogout(): void {
    this.store.dispatch(fromAuthStore.logout());
  }
}
