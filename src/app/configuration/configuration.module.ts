import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import {
  CONFIGURATION_STATE_NAME,
  ConfigurationEffects,
  configurationReducer,
} from './store';
import { StoreModule } from '@ngrx/store';
import { HomeConfigurationComponent } from './home-configuration/home-configuration.component';
import { SiteMainComponent } from './sites/site-main/site-main.component';
import { CheckboxModule } from 'primeng/checkbox';
import { SiteAsideComponent } from './sites/site-aside/site-aside.component';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SiteShiftsConfigurationComponent } from './sites/site-shifts-configuration/site-shifts-configuration.component';
import { SiteDetailsComponent } from './sites/site-details/site-details.component';
import { KmzFilesComponent } from './sites/kmz-files/kmz-files.component';
import { TripDetailsComponent } from './sites/trip-details/trip-details.component';
import { SpecificationsComponent } from './sites/specifications/specifications.component';
import { DropdownModule } from 'primeng/dropdown';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { FormsModule } from '@angular/forms';
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
    EffectsModule.forFeature([ConfigurationEffects]),
    StoreModule.forFeature(CONFIGURATION_STATE_NAME, configurationReducer),
  ],
  providers: [ConfirmationService],
})
export class ConfigurationModule {}
