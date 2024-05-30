import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  items: MenuItem[] = [];
  ngOnInit(): void {
    this.items = [
      {
        label: 'Fleet Management',
        icon: 'fa-light fa-cube',
        routerLink: 'fleet',
      },
      {
        label: 'Fuel Management',
        icon: 'fa-light fa-droplet',
        routerLink: 'fuel',
      },
      {
        label: 'Maintenance',
        icon: 'fa-light fa-gear-complex',
        routerLink: 'maintenance/home',
      },
      {
        label: 'Production',
        icon: 'fa-light fa-cubes',
        routerLink: 'production',
      },
      {
        label: 'Configurator',
        icon: 'fa-light fa-sliders',
        routerLink: 'configuration',
        styleClass: 'config-bottom',
      },
    ];
  }
}
