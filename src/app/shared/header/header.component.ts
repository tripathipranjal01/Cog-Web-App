import { Component, Input, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuthStore from '../../auth/store';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  items: MenuItem[];
  home: MenuItem;
  actionItems: MenuItem[];

  store = inject(Store);
  @Input({ required: true }) title: string;
  @Input({ required: true }) icon: string;

  ngOnInit() {
    this.items = [{label: 'Maintenance'}, {label: 'Service'}];
    this.home = {icon: 'pi pi-home', routerLink: '/fleet'}
    this.actionItems = [
      { label: 'Report', icon: 'pi pi-fw pi-file-excel' },
      { label: 'Task', icon: 'pi pi-fw pi-server' },
      { label: 'Logbook', icon: 'pi pi-fw pi-book' },
  ];
  }

  initiateLogout(): void {
    this.store.dispatch(fromAuthStore.logout());
  }
}
