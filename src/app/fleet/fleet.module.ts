import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FleetRoutingModule } from './fleet-routing.module';
import { FleetComponent } from './fleet/fleet.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [FleetComponent],
  imports: [CommonModule, FleetRoutingModule, SharedModule],
})
export class FleetModule {}
