import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-my-appointment',
  templateUrl: './my-appointment.component.html',
  styleUrls: ['./my-appointment.component.scss']
})
export class MyAppointmentComponent implements OnInit {

  logList: any;

  title = 'pagination';
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 40;
  tableSizes: any = [5, 10, 15, 20];
  searchText: any;

  email: any;
  id: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.email = localStorage.getItem('email');

    this.apiService.getPatientId(this.email).subscribe(result => {
      this.id = {
        "id": result[0]['id']
      };


      this.apiService.patientAppointment(this.id).subscribe(result => {
        this.logList = result;


      });

      // console.log(this.id);
    });

    // console.log(this.id);


  }

  onTableDataChange(event: any) {
    this.page = event;
    // this.postList();

  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  Search() {
    if (this.searchText == "") {
      this.ngOnInit();
    }
    else {
      this.searchText = this.searchText.filter(res => {
        return res.searchText.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase());
      });
    }
  }

}
