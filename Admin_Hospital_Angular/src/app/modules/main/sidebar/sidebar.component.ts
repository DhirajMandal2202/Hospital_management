import { Component, OnInit, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiService } from '@services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() sideNavStatus: boolean = false;

  status: any;
  verify: any;
  email: any;

  constructor(private router: Router, private apiService: ApiService) { }


  ngOnInit(): void {
    // this.status = localStorage.getItem("verify");
    this.verify = localStorage.getItem("verify");
    this.email = localStorage.getItem("email");
  }

  logout() {


    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Log Out',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Log Out',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('verify');
        localStorage.removeItem('status');
        this.router.navigate(['login']);
        Swal.fire('Logged Out !', '', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', '', 'error');
      }
    });


  }

}
