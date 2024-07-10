import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustTankComponent } from './adjust-tank.component';

describe('AdjustTankComponent', () => {
  let component: AdjustTankComponent;
  let fixture: ComponentFixture<AdjustTankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdjustTankComponent],
    });
    fixture = TestBed.createComponent(AdjustTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
