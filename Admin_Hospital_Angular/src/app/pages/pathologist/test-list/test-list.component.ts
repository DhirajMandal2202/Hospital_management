import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss']
})
export class TestListComponent implements OnInit {

  List: any;

  title = 'pagination';
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 40;
  tableSizes: any = [5, 10, 15, 20];
  searchText: any;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.pathologyTestList().subscribe(result=>{
      this.List=result;
    })
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
