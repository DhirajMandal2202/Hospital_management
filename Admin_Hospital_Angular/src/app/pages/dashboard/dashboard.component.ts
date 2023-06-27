import { Component } from '@angular/core';
import { ApiService } from '@services/api.service';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

    countPost: any;
    len: any;

    constructor(private apiService: ApiService) { }

    ngOnInit() {

        this.apiService.isLoggedIn();
        this.post();

    }

    post() {
        this.apiService.fetchNews().subscribe(result => {

            this.countPost = result["data"];


        });

    }





}
