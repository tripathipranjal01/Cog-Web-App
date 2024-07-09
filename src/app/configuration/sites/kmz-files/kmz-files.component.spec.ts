import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KmzFilesComponent } from './kmz-files.component';

describe('KmzFilesComponent', () => {
  let component: KmzFilesComponent;
  let fixture: ComponentFixture<KmzFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KmzFilesComponent]
    });
    fixture = TestBed.createComponent(KmzFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
