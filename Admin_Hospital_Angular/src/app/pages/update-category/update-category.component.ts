import { number } from '@amcharts/amcharts4/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  constructor(private acRoute: ActivatedRoute, private apiService: ApiService) { }
  id: any;
  status: any;
  category_name: any;
  value1 = "working";
  data: any[];

  ngOnInit(): void {

    // console.log(this.acRoute.snapshot.params);
    this.id = Number(this.acRoute.snapshot.params.id);
    this.status = Number(this.acRoute.snapshot.params.status);
    this.category_name = this.acRoute.snapshot.params.category_name;
  }


  update(val) {

    this.data = [{
      "id": this.id,
      "category_name": val['category_name'],
      "status": this.status


    }]

    this.apiService.updateCategory(this.data[0]);

  }





}
