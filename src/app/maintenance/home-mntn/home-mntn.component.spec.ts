import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMntnComponent } from './home-mntn.component';

describe('HomeMntnComponent', () => {
  let component: HomeMntnComponent;
  let fixture: ComponentFixture<HomeMntnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMntnComponent],
    });
    fixture = TestBed.createComponent(HomeMntnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
