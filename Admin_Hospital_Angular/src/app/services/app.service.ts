import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gatekeeper } from 'gatekeeper-client-sdk';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public user: any = null;
    token: any;
    url: string = "http://products.pisystindia.com/non-agency-news-api";

    constructor(private router: Router, private toastr: ToastrService, private http: HttpClient) { }



    // async loginByAuth({email, password}) {
    //     try {
    //         const token = await Gatekeeper.loginByAuth(email, password);
    //         localStorage.setItem('token', token);
    //         await this.getProfile();
    //         this.router.navigate(['/']);
    //     } catch (error) {
    //         this.toastr.error(error.message);
    //     }
    // }

    // async registerByAuth({email, password}) {
    //     try {
    //         const token = await Gatekeeper.registerByAuth(email, password);
    //         localStorage.setItem('token', token);
    //         await this.getProfile();
    //         this.router.navigate(['/']);
    //     } catch (error) {
    //         this.toastr.error(error.message);
    //     }
    // }

    // async loginByGoogle() {
    //     try {
    //         const token = await Gatekeeper.loginByGoogle();
    //         localStorage.setItem('token', token);
    //         await this.getProfile();
    //         this.router.navigate(['/']);
    //     } catch (error) {
    //         this.toastr.error(error.message);
    //     }
    // }

    // async registerByGoogle() {
    //     try {
    //         const token = await Gatekeeper.registerByGoogle();
    //         localStorage.setItem('token', token);
    //         await this.getProfile();
    //         this.router.navigate(['/']);
    //     } catch (error) {
    //         this.toastr.error(error.message);
    //     }
    // }

    // async loginByFacebook() {
    //     try {
    //         const token = await Gatekeeper.loginByFacebook();
    //         localStorage.setItem('token', token);
    //         await this.getProfile();
    //         this.router.navigate(['/']);
    //     } catch (error) {
    //         this.toastr.error(error.message);
    //     }
    // }

    // async registerByFacebook() {
    //     try {
    //         const token = await Gatekeeper.registerByFacebook();
    //         localStorage.setItem('token', token);
    //         await this.getProfile();
    //         this.router.navigate(['/']);
    //     } catch (error) {
    //         this.toastr.error(error.message);
    //     }
    // }

    // async getProfile() {
    //     try {
    //         this.user = await Gatekeeper.getProfile();
    //     } catch (error) {
    //         this.logout();
    //         throw error;
    //     }
    // }

    logout() {
        // localStorage.removeItem('token');
        // localStorage.removeItem('gatekeeper_token');
        // this.user = null;
        // this.router.navigate(['/login']);

        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to Log Out',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Log Out',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post(this.url + "/admin/logout", " ").subscribe((result) => {
                    // console.log(result);
                    Swal.fire('Logged Out !', '', 'success');

                });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
            }
        });
    }
}
