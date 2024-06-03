import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCardComponent } from './chart-card.component';

describe('ChartCardComponent', () => {
  let component: ChartCardComponent;
  let fixture: ComponentFixture<ChartCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartCardComponent],
    });
    fixture = TestBed.createComponent(ChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
