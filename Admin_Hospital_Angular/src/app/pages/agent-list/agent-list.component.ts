import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {

  agentList: any;
  agentId: any;

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

    this.fetchAllAgent();
    this.apiService.Refreshrequired.subscribe(Response => {
      this.fetchAllAgent();

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


  fetchAllAgent() {

    this.apiService.allAgent().subscribe(result => {

      this.agentList = result['data'];
      // console.log(result);


    });

  }

  toggle(id) {

    this.agentId = { "id": Number(id) };
    // console.log(this.userId);
    this.apiService.userStatus(this.agentId);
  }


}
