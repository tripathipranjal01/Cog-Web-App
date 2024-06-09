import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductionComponent } from './home-production.component';

describe('HomeProductionComponent', () => {
  let component: HomeProductionComponent;
  let fixture: ComponentFixture<HomeProductionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeProductionComponent]
    });
    fixture = TestBed.createComponent(HomeProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
