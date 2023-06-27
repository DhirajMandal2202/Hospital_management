import { Injectable } from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '@services/app.service';
import { ApiService } from '@services/api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private appService: AppService, private apiService: ApiService) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = localStorage.getItem('token');

        if (token != null) {
            // TODO: Verify the token's validity here.
            return true;
        }

        this.router.navigate(['/login']);
        return false;


    }



    // canActivate(
    //     next: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot
    // ):
    //     | Observable<boolean | UrlTree>
    //     | Promise<boolean | UrlTree>
    //     | boolean
    //     | UrlTree {

    //     if (this.apiService.isLoggedIn) {
    //         return true;
    //     }
    //     else {
    //         this.router.navigate(['login']);
    //         return false;

    //     }
    // }








    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        // return this.canActivate(next, state);
        return false;
    }

    // async getProfile() {
    //     if (this.appService.user) {
    //         return true;
    //     }

    //     try {
    //         await this.appService.getProfile();
    //         return true;
    //     } catch (error) {
    //         return false;
    //     }
    // }

    loginCheck() {
        if (this.apiService.isLoggedIn) {
            return true;
        }
        else {
            this.router.navigate(['login']);
            return false;

        }
    }


}
