import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent implements OnInit {

  addTest: any;

  constructor(private apiService: ApiService, private route: Router) { }


  ngOnInit(): void {
  }

  getValue(val) {


    this.addTest = {
      "test_name": val['test_name'],
      "amount": val['amount'],
      "status": "1"
    };

    // console.log(this.addTest);

    this.apiService.addPathologyTest(this.addTest);
  }


}
