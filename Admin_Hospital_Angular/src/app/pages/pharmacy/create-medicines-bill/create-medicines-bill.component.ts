import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-create-medicines-bill',
  templateUrl: './create-medicines-bill.component.html',
  styleUrls: ['./create-medicines-bill.component.scss']
})
export class CreateMedicinesBillComponent implements OnInit {

  constructor(private apiService: ApiService, private route: Router) { }

  doctorList: any;
  patientList: any;
  testList: any;
  payment: any;
  medicinesList: any;
  amount: number = 0;
  data: any;

  totalAmount: any;


  bill: any;
  ngOnInit(): void {

    this.apiService.doctarDetails().subscribe((result) => {
      this.doctorList = result;

    });

    this.apiService.patientDetails().subscribe((result) => {
      this.patientList = result;
      // console.log(this.patientList);
    });

    this.apiService.paymentMethodList().subscribe((result) => {
      this.payment = result;
      console.log(this.payment);
    });
    this.apiService.fetchMedicine().subscribe(result => {
      this.medicinesList = result;
      // console.log(this.medicinesList);
    });
  }

  getValue(val) {

    this.bill = {
      "patient_id": val['patient_id'],
      "doctor_id": val['doctor_id'],
      "medicine_id": val['medicine_id'],
      "date": val['date'],
      "payment_id": val['payment_id'],
      "quantity": val['quantity'],
      "total_amount": val['amount'],
      "status": "1"


    };
    console.log(this.bill);

    this.apiService.makeBill(this.bill);


  }

  getAmount(med_id, amount) {


    this.data = {
      "id": med_id,
      "amount": amount
    }

    this.apiService.getAmountforMed(this.data).subscribe(result => {

      this.totalAmount = result;

      console.log(this.totalAmount);
    });


  }

}
