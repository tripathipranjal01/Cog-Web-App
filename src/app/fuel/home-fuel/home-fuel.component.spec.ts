import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFuelComponent } from './home-fuel.component';

describe('HomeFuelComponent', () => {
  let component: HomeFuelComponent;
  let fixture: ComponentFixture<HomeFuelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFuelComponent],
    });
    fixture = TestBed.createComponent(HomeFuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
