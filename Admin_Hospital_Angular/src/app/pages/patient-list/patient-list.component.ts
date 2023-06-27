import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  List: any;

  title = 'pagination';
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 40;
  tableSizes: any = [5, 10, 15, 20];
  searchText: any;

  ngOnInit(): void {
    this.apiService.patientDetails().subscribe(result => {

      this.List = result;
      // console.log(result);


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
