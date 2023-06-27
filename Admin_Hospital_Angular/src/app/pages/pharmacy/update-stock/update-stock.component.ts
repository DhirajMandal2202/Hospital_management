import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss']
})
export class UpdateStockComponent implements OnInit {

  addMedicine1: any;
  constructor(private apiService: ApiService) { }
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
