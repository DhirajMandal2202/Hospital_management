import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router'
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  id: any;
  data: any;
  userNewsList: any;
  url: string = "http://products.pisystindia.com/non-agency-news-api";



  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    this.displayNews();


    // console.log(this.id);
  }

  displayNews() {

    this.data = {
      "id": Number(this.id)
    }
    // console.log(this.data);

    this.apiService.fetchNewsByUserId(this.data).subscribe((result) => {
      // console.log(result);
      this.userNewsList = [result];
    });

  }
  uploadNews() {

    this.data = {
      "id": Number(this.id)
    }

    this.apiService.uploadNews(this.data);
  }

}
