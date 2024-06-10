import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionRoutingModule } from './production-routing.module';
import { ProductionComponent } from './production/production.component';
import { SharedModule } from '../shared/shared.module';
import { HomeProductionComponent } from './home-production/home-production.component';
import { ProductionEffects } from './store';
import { PRODUCTION_STATE_NAME, productionReducer } from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [ProductionComponent, HomeProductionComponent],
  imports: [
    CommonModule,
    ProductionRoutingModule,
    SharedModule,
    EffectsModule.forFeature([ProductionEffects]),
    StoreModule.forFeature(PRODUCTION_STATE_NAME, productionReducer),
  ],
})
export class ProductionModule {}
