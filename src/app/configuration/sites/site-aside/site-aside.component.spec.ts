import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAsideComponent } from './site-aside.component';

describe('SiteAsideComponent', () => {
  let component: SiteAsideComponent;
  let fixture: ComponentFixture<SiteAsideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteAsideComponent],
    });
    fixture = TestBed.createComponent(SiteAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
