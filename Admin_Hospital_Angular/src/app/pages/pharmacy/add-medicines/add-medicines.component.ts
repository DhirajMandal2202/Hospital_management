import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-add-medicines',
  templateUrl: './add-medicines.component.html',
  styleUrls: ['./add-medicines.component.scss']
})
export class AddMedicinesComponent implements OnInit {

  addMedicine1: any;
  constructor(private apiService: ApiService, private route: Router) { }

  ngOnInit(): void {
  }
  getValue(val) {


    this.addMedicine1 = {
      "med_name": val['medicine'],
      "instock": val['quantity'],
      "per_price": val['amount'],
      "status": "1"

    };

    console.log(this.addMedicine1);

    this.apiService.addNewMedicine(this.addMedicine1);
  }


}
