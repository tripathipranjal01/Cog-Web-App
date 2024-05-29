import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  isSidenavExpanded = true;
  items: MenuItem[] = [];

  ngOnInit(): void {
    // this.isSidenavExpanded = false;
    this.items = [
      {
        label: '',
        icon: 'fa-light fa-cube',
        routerLink: 'fleet',
      },
      {
        label: '',
        icon: 'fa-light fa-droplet',
        routerLink: 'fuel',
      },
      {
        label: '',
        icon: 'fa-light fa-gear-complex',
        routerLink: 'maintenance/home',
      },
      {
        label: '',
        icon: 'fa-light fa-cubes',
        routerLink: 'production',
      },
      {
        label: '',
        icon: 'fa-light fa-sliders',
        routerLink: 'configuration',
        styleClass: 'config-bottom',
      },
    ];
  }

  onSideBarToggle() {
    this.isSidenavExpanded = !this.isSidenavExpanded;
  }
}
