import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  items: MenuItem[] = [];
  currentSideNavModule = '';

  router = inject(Router);

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentSideNavModule = this.router.url.split('/')[1];
      });

    this.items = [
      {
        label: 'Fleet Management',
        icon: 'fa-light fa-cube',
        routerLink: 'fleet/home',
      },
      {
        label: 'Fuel Management',
        icon: 'fa-light fa-droplet',
        routerLink: 'fuel/home',
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
