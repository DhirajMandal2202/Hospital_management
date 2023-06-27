import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private apiService: ApiService, private toastr: ToastrService) { }

  signup: any;
  reactiveform: FormGroup;
  [x: string]: any;
  repeatPass: string = 'none';



  ngOnInit(): void {
    this.myForm = new FormGroup({

      fullname: new FormControl('', [Validators.required,]),
      sex: new FormControl('', [Validators.required,]),
      birthday: new FormControl('', [Validators.required,]),
      bloodgroup: new FormControl('', [Validators.required,]),
      address: new FormControl('', [Validators.required,]),
      email: new FormControl('', [Validators.required, Validators.email,]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmpassword: new FormControl('', [Validators.required,]),
      phoneno: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10,}')]),

    });
  }

  get fullname() { return this.myForm.get('fullname') };
  get birthday() { return this.myForm.get('birthday') };
  get bloodgroup() { return this.myForm.get('bloodgroup') };
  get address() { return this.myForm.get('address') };
  get phoneno() { return this.myForm.get('phoneno') };
  get password() { return this.myForm.get('password'); }
  get confirmpassword() { return this.myForm.get('confirmpassword') };
  get email() { return this.myForm.get('email') };
  get sex() { return this.myForm.get('sex') };

  registerSubmited() {
    if (this.password.value == this.confirmpassword.value) {
      console.log(this.myForm.valid);
      // console.log("success called");
      this.repeatPass = 'none';
    }
    else {
      this.repeatPass = 'inline'
      // console.log("inline called");

    }
  }


  onSubmit() { }

  getValue() {

    if (this.myForm.valid) {
      console.log(this.myForm.value);
      // this.apiService.signup(this.myForm.value);


      this.signup = {
        "full_name": this.myForm.value.fullname,
        "mail_id": this.myForm.value.email,
        "password": this.myForm.value.password,
        "gender": this.myForm.value.sex,
        "address": this.myForm.value.address,
        "birth_date": this.myForm.value.birthday,
        "blood_group": this.myForm.value.bloodgroup,
        "phone_no": this.myForm.value.phoneno,
        "verify": "2",
        "status": "1"

      };
      // console.log(this.signup);
      this.apiService.signup(this.signup);

    }
    else {
      this.toastr.error("Empty or invalid Field!!");
    }


    // console.log(val);
    // this.signup = {
    //   "full_name": val['fullname'],
    //   "mail_id": val['email'],
    //   "password": val['password'],
    //   "gender": val['sex'],
    //   "address": val['address'],
    //   "birth_date": val['birthday'],
    //   "blood_group": val['bloodgroup'],
    //   "phone_no": val['phoneno'],
    //   "verify": "2",
    //   "status": "1"

    // };
    // console.log(this.signup);

    // this.apiService.signup(this.signup);
  }

}
