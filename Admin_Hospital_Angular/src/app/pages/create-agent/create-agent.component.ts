import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '@services/api.service';

@Component({
  selector: 'app-create-agent',
  templateUrl: './create-agent.component.html',
  styleUrls: ['./create-agent.component.scss']
})
export class CreateAgentComponent implements OnInit {

  constructor(private apiService: ApiService, private route: Router) { }

  addAgent: any;
  data:any;


  ngOnInit(): void {
  }

  getValue(val) {
    this.data=val;

   
    // console.log(val);

    this.apiService.createAgent(this.data);
  }

}
