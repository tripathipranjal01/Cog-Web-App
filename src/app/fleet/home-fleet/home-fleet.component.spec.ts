import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFleetComponent } from './home-fleet.component';

describe('HomeFleetComponent', () => {
  let component: HomeFleetComponent;
  let fixture: ComponentFixture<HomeFleetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFleetComponent],
    });
    fixture = TestBed.createComponent(HomeFleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
