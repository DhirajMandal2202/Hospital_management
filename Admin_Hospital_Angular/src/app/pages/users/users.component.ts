import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersList: any;
  userId: any;

  toggleStatus = "checked";

  
  fileName = 'UserSheet.xlsx'; //Downloading File Name


  title = 'pagination';
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  searchText: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.allUsers();
    this.apiService.Refreshrequired.subscribe(Response => {
      this.allUsers();

    });
  }

   // Download Excel-Sheet -------------------------
   public expoertTableToExcel(): void {

    let element = document.getElementById('excel-table');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)

    const wb: XLSX.WorkBook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(wb, ws, 'sheet1')

    XLSX.writeFile(wb, this.fileName)
  }

  // pagination code -----------------------
  onTableDataChange(event: any) {
    this.page = event;


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

  // ------------------------------------


  allUsers() {

    this.apiService.fetchAllUsers().subscribe(result => {

      this.usersList = result['data'];


    });

  }

  toggle(id) {

    this.userId = { "id": Number(id) };
    // console.log(this.userId);
    this.apiService.userStatus(this.userId);
  }

}
