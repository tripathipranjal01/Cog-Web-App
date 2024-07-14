import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { SharedModule } from '../shared/shared.module';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
import { HomeConfigurationComponent } from './home-configuration/home-configuration.component';
import { SiteMainComponent } from './sites/site-main/site-main.component';
import { SiteAsideComponent } from './sites/site-aside/site-aside.component';
import { SiteShiftsConfigurationComponent } from './sites/site-shifts-configuration/site-shifts-configuration.component';
import { SiteDetailsComponent } from './sites/site-details/site-details.component';
import { KmzFilesComponent } from './sites/kmz-files/kmz-files.component';
import { TripDetailsComponent } from './sites/trip-details/trip-details.component';
import { SpecificationsComponent } from './sites/specifications/specifications.component';
import { SitesComponent } from './sites/sites.component';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    ConfigurationComponent,
    HomeConfigurationComponent,
    SiteMainComponent,
    SiteAsideComponent,
    SiteShiftsConfigurationComponent,
    SiteDetailsComponent,
    KmzFilesComponent,
    TripDetailsComponent,
    SpecificationsComponent,
    SitesComponent,
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    SharedModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    CheckboxModule,
    ToggleButtonModule,
    FormsModule,
  ],
  providers: [ConfirmationService],
})
export class ConfigurationModule {}
