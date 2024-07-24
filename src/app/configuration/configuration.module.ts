import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { SharedModule } from '../shared/shared.module';
import { HomeConfigurationComponent } from './home-configuration/home-configuration.component';
import { SitesComponent } from './sites/sites.component';
import { SiteAsideComponent } from './sites/site-aside/site-aside.component';
import { SiteDetailsComponent } from './sites/site-details/site-details.component';
import { SiteMainComponent } from './sites/site-main/site-main.component';
import { SiteShiftsConfigurationComponent } from './sites/site-shifts-configuration/site-shifts-configuration.component';

@NgModule({
  declarations: [
    ConfigurationComponent,
    HomeConfigurationComponent,
    SitesComponent,
    SiteAsideComponent,
    SiteDetailsComponent,
    SiteMainComponent,
    SiteShiftsConfigurationComponent,
  ],
  imports: [CommonModule, ConfigurationRoutingModule, SharedModule],
})
export class ConfigurationModule {}
