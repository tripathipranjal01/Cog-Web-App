import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelValueCardComponent } from './label-value-card.component';

describe('LabelValueCardComponent', () => {
  let component: LabelValueCardComponent;
  let fixture: ComponentFixture<LabelValueCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabelValueCardComponent],
    });
    fixture = TestBed.createComponent(LabelValueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
