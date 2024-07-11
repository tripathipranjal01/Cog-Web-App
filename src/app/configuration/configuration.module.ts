import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { SharedModule } from '../shared/shared.module';
import { HomeConfigurationComponent } from './home-configuration/home-configuration.component';

@NgModule({
  declarations: [ConfigurationComponent, HomeConfigurationComponent],
  imports: [CommonModule, ConfigurationRoutingModule, SharedModule],
})
export class ConfigurationModule {}
