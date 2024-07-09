import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';
import { HomeConfigurationComponent } from './home-configuration/home-configuration.component';
import { SiteMainComponent } from './sites/site-main/site-main.component';
import { SitesComponent } from './sites/sites.component';

export const CONFIGURATION_ROUTES_NAMES = {
  HOME: 'home',
};

const CONFIGURATION_ROUTES = [
  {
    path: CONFIGURATION_ROUTES_NAMES.HOME,
    component: HomeConfigurationComponent,
    children: [
      {
        path: '',
        component: ConfigurationComponent,
        data: { breadcrumb: { alias: 'configuration' } },
      },
      {
        path: 'site',
        component: SitesComponent,
      },
      {
        path: 'site/:id',
        component: SiteMainComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(CONFIGURATION_ROUTES)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
