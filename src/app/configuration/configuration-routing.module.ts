import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';

export const CONFIGURATION_ROUTES_NAMES = {};

const CONFIGURATION_ROUTES = [{ path: '', component: ConfigurationComponent }];

@NgModule({
  imports: [RouterModule.forChild(CONFIGURATION_ROUTES)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
