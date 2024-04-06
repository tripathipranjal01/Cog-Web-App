import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineHrComponent } from './machine-hr.component';

describe('MachineHrComponent', () => {
  let component: MachineHrComponent;
  let fixture: ComponentFixture<MachineHrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MachineHrComponent],
    });
    fixture = TestBed.createComponent(MachineHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
