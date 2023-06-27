import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormControlName } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '@services/app.service';
import { ApiService } from '@services/api.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @HostBinding('class') class = 'login-box';

    data: any;
    myForm: FormGroup;



    // public loginForm: FormGroup;
    // public isAuthLoading = false;
    // public isGoogleLoading = false;
    // public isFacebookLoading = false;


    constructor(

        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private toastr: ToastrService,
        private router: Router
    ) { }

    ngOnInit() {

        this.initForm();




    }
    initForm() {
        this.myForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email,]),
            password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        });

    }





    get email() { return this.myForm.get('email') };
    get password() { return this.myForm.get('password'); }

    onSubmit() {



        // this.apiService.login(this.data);

        if (this.myForm.valid) {

            // console.log(this.myForm.valid);

            this.apiService.login(this.myForm.value).subscribe((result) => {
                // console.log(result);

                if (result['status']) {
                    // Swal.fire('You are Logged In!!', "", 'success');
                    this.toastr.success("You are Logged In!!");
                    localStorage.setItem("token", result['token']);
                    localStorage.setItem("status", result['status']);
                    localStorage.setItem("verify", result['verify']);
                    localStorage.setItem("email", result['email']);
                    // localStorage.setItem("email", result['payload']['email']);


                    var role = localStorage.getItem("verify");
                    console.log(role);

                    if (role == "1") {
                        console.log(role);
                        this.router.navigate(['hospital/adminPage/'])
                    }

                    if (role == "2") {
                        console.log(role);
                        this.router.navigate(['hospital/patientPage/'])
                    }
                    if (role == "3") {
                        console.log(role);
                        this.router.navigate(['hospital/doctorPage/'])
                    }
                    // this.router.navigate(['admin/']);
                }


                else {
                    console.log(result);
                    this.toastr.error(result['message']);
                    this.router.navigate(['login']);
                }


                // this.roter.navigateByUrl("doctor");  

            }, (error: HttpErrorResponse) => {
                // Handle the error response


                // console.log(error);
                // console.error('An error occurred:', error.error["message"]);
                this.toastr.error(error.error['message']);
                console.error('Status code:', error.status);
                console.error('Status text:', error.statusText);
            });



        }
        else {
            this.toastr.error("Empty Field!!");
        }

    }


}



