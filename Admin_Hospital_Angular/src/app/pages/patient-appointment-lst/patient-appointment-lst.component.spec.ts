import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAppointmentLstComponent } from './patient-appointment-lst.component';

describe('PatientAppointmentLstComponent', () => {
  let component: PatientAppointmentLstComponent;
  let fixture: ComponentFixture<PatientAppointmentLstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientAppointmentLstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAppointmentLstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
