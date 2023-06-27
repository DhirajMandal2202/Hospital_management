import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  id: any;
  title: any;
  description: any;
  data: any;
  userNewsList: any;
  previousTitle: any;
  prviousDescription: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.displayNews();
  }

  newsUpdate(val) {

    this.title = val['title'];
    this.description = val['description'];

    var formData: any = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('id', this.id);
    this.apiService.updateNews(formData, this.id);

  }



  displayNews() {

    this.data = {
      "id": Number(this.id)
    }
    // console.log(this.data);

    this.apiService.fetchNewsByUserId(this.data).subscribe((result) => {
      // console.log(result);
      this.userNewsList = [result];
      this.previousTitle = this.userNewsList[0]['title'];
      this.prviousDescription = this.userNewsList[0]['description'];
    });

  }



}
