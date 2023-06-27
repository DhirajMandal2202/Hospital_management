import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-approved-list',
  templateUrl: './approved-list.component.html',
  styleUrls: ['./approved-list.component.scss']
})
export class ApprovedListComponent implements OnInit {

  constructor(private apiService: ApiService, private route: Router) { }
  List: any;

  title = 'pagination';
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 40;
  tableSizes: any = [5, 10, 15, 20];
  searchText: any;


  email: any;

  ngOnInit(): void {

    this.email = {
      "email": localStorage.getItem('email')
    };

  



    this.apiService.doctorAppointmentList(this.email).subscribe(result => {
      this.List = result;


    });
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
