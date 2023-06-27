import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  constructor(private apiService: ApiService, private route: Router) { }
  addDepartment: any;

  ngOnInit(): void {
  }
  getValue(val) {

    this.addDepartment = {
      "department": val['department_name'],
      "status": "1"
    };

    this.apiService.addDepartment(this.addDepartment);
  }
}
