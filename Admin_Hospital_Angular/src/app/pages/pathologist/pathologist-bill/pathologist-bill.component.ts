import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-pathologist-bill',
  templateUrl: './pathologist-bill.component.html',
  styleUrls: ['./pathologist-bill.component.scss']
})
export class PathologistBillComponent implements OnInit {

  constructor(private apiService: ApiService, private route: Router) { }

  doctorList: any;
  patientList: any;
  testList: any;
  payment: any;
  amount = "0";

  bill: any;

  ngOnInit(): void {
    this.apiService.doctarDetails().subscribe((result) => {
      this.doctorList = result;
    });

    this.apiService.patientDetails().subscribe((result) => {
      this.patientList = result;
    });

    this.apiService.pathologyTestList().subscribe((result) => {
      this.testList = result;

    });

    this.apiService.paymentMethodList().subscribe((result) => {
      this.payment = result;
    });
  }
  getValue(val) {

    this.bill = {
      "patient_id": val['patient_id'],
      "test_id": val['test_id'],
      "doctor_id": val['doctor_id'],
      "date": val['date'],
      "amount": val['amount'],
      "payment_id": val['payment_id'],


    };
    // console.log(this.bill);

    this.apiService.pathologyBill(this.bill);


  }
  fetchAmount(event: Event) {

    const selectElement = event.target as HTMLSelectElement;
    const selectedvalue = selectElement.value;
    // console.log(selectedvalue);

    if (selectedvalue != "0") {

      this.apiService.pathologyAmount(selectedvalue).subscribe((result) => {
        // console.log(result);
        this.amount = result['amount'];
        // console.log(this.amount);
      });

    } else {
      console.log(" Pathology test is not selected");
      this.amount = "0";
    }

  }
}
