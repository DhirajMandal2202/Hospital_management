import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, take } from "rxjs/operators";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  title = 'pagination';
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];

  searchText: any;


  categoryList: any;

  categoryId: any;

  toggleStatus = "checked";


  constructor(private http: HttpClient, private route: Router, private apiService: ApiService) { }


  ngOnInit(): void {
    this.displayCategory();

    this.apiService.Refreshrequired.subscribe(Response => {
      this.displayCategory();

    });

  }

  delCategory(id) {

    // console.log(id);
    this.categoryId = { "id": id };

    this.apiService.delCategory_api(this.categoryId);
    this.ngOnInit();



  }
  displayCategory() {
    this.apiService.fetchAllCategory().subscribe(result => {

      this.categoryList = result['data'];
      // console.log(result['data']);


    });

    return (this.categoryList);

  }

  toggle(id) {

    this.categoryId = { "id": Number(id) };
    this.apiService.statusCategory(this.categoryId);
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
