import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit {





  constructor(private apiService: ApiService, private route: Router) { }

  addDoctor: any;

  departmentList:any;

  ngOnInit(): void {

    this.apiService.departmentList().subscribe(result=>{
      this.departmentList=result;
    })

  }
  getValue(val) {


    this.
      addDoctor = {
      "first_name": val['first_name'],
      "last_name": val['last_name'],
      "age": val['age'],
      "sex": val['sex'],
      "email": val['email'],
      "password": val['password'],
      "designation": val['designation'],
      "department": val['department'],
      "address": val['address'],
      "phone": val['phone'],
      "birth_date": val['birth_date'],
      "blood_group": val['blood_group'],
      "status": "1"

    };

    // console.log(this.addDoctor);

    this.apiService.addDoctor(this.
      addDoctor);

  }
}
