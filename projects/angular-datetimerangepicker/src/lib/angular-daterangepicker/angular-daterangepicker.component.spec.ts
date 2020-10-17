import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularDaterangepickerComponent } from './angular-daterangepicker.component';

describe('AngularDaterangepickerComponent', () => {
  let component: AngularDaterangepickerComponent;
  let fixture: ComponentFixture<AngularDaterangepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularDaterangepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularDaterangepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
