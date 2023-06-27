import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-pharmacy-bill-list',
  templateUrl: './pharmacy-bill-list.component.html',
  styleUrls: ['./pharmacy-bill-list.component.scss']
})
export class PharmacyBillListComponent implements OnInit {

  billList: any;

  title = 'pagination';
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 40;
  tableSizes: any = [5, 10, 15, 20];
  searchText: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.medicinesBillList().subscribe(result => {

      this.billList = result;
      console.log(this.billList);
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
