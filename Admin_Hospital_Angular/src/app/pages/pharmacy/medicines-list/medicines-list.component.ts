import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-medicines-list',
  templateUrl: './medicines-list.component.html',
  styleUrls: ['./medicines-list.component.scss']
})
export class MedicinesListComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  logList: any;

  title = 'pagination';
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 40;
  tableSizes: any = [5, 10, 15, 20];
  searchText: any;

  

  ngOnInit(): void {
    this.apiService.fetchMedicine().subscribe(result => {

      this.logList = result;
      console.log(result);

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
