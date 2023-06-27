import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  newsList: any;
  data: any;

  fileName = 'newPostSheet.xlsx'; //Downloading File Name

  title = 'pagination';
  POSTS: any;
  page: number = 1;
  count: number = 1;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  searchText: any;
  counter = 0;




  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.displayNews();
    this.apiService.Refreshrequired.subscribe(Response => {
      this.displayNews();

    });

  }
  getCount() {

   


      return ++this.counter;

    


  }

  displayNews() {
    this.apiService.fetchNews().subscribe(result => {

      this.newsList = result["data"];
      // console.log(this.newsList);



    });

  }

  reject(id) {
    // console.log(id)
    this.data = {
      "id": id
    }
    this.apiService.blockNews(this.data);
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

}
