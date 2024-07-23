import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteShiftsConfigurationComponent } from './site-shifts-configuration.component';

describe('SiteShiftsConfigurationComponent', () => {
  let component: SiteShiftsConfigurationComponent;
  let fixture: ComponentFixture<SiteShiftsConfigurationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteShiftsConfigurationComponent]
    });
    fixture = TestBed.createComponent(SiteShiftsConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
