import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor(private apiService: ApiService, private route: Router) { }

  addCategory: any;

  ngOnInit(): void {


  }

  getValue(val) {

    this.addCategory = {
      "category_name": val['category_name'],
      "status": 1
    };

    this.apiService.addCategory(this.addCategory);
  }










}
