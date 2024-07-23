import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';
import { HomeConfigurationComponent } from './home-configuration/home-configuration.component';
import { SitesComponent } from './sites/sites.component';

export const CONFIGURATION_ROUTES_NAMES = {
  HOME: 'home',
  SITE: 'site',
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
        path: CONFIGURATION_ROUTES_NAMES.SITE,
        component: SitesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(CONFIGURATION_ROUTES)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}