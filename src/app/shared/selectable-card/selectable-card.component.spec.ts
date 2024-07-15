import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectableCardComponent } from './selectable-card.component';

describe('SelectableCardComponent', () => {
  let component: SelectableCardComponent;
  let fixture: ComponentFixture<SelectableCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectableCardComponent]
    });
    fixture = TestBed.createComponent(SelectableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
