import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {

  addAppointment: any;
  doctorList: any;
  departmentList: any;
  email: any;
  id: any;


  constructor(private apiService: ApiService, private route: Router) { }

  ngOnInit(): void {

    this.email = localStorage.getItem('email');

    this.fetchId(this.email);

    this.apiService.doctarDetails().subscribe((result) => {
      this.doctorList = result;
    });

    this.apiService.departmentList().subscribe(result => {
      this.departmentList = result;
    });
  }
  getValue(val) {

    this.addAppointment = {
      "patient_id": this.id,
      "date": val['dates'],
      "department_id": val['spec'],
      "doctor_id": val['doc'],
      "shift": val['shift'],
      "priority": val['Priority'],
      "status": "0"
    };
    console.log(this.addAppointment);

    this.apiService.addAppointment(this.addAppointment);
  }

  fetchId(val) {

    console.log(val);


    this.apiService.getPatientId(this.email).subscribe(result => {
      this.id = result[0]['id'];
    });


  }


}
