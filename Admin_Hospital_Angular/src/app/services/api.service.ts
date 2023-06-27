import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

// import { CategoryComponent } from '@pages/category/category.component';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }
    token: any;
    url: string = "aksjdfkalsjdf";



    private _refreshRequired = new Subject<void>();
    get Refreshrequired() {
        return this._refreshRequired;
    }


    login(data): Observable<any> {
        return this.http.post("https://localhost:7250/api/Credential/authenticate", data);
    }






    isLoggedIn() {
        return localStorage.getItem("token") != null; //if token availabe then return true else false


    }

    logOut() {


        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to Log Out',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Log Out',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post(this.url + "/admin/logout", "").subscribe((result) => {
                    // console.log(result);
                    localStorage.removeItem('token');
                    localStorage.removeItem('email');
                    localStorage.removeItem('verify');
                    localStorage.removeItem('status');
                    this.router.navigate(['login']);
                    Swal.fire('Logged Out !', '', 'success');

                });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
            }
        });
    }



    // Doctor API -----------------------------


    doctarDetails() {
        return this.http.get("https://localhost:7250/api/Doctor");
    }
    addDoctor(data) {

        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Add',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post("https://localhost:7250/api/Doctor/addDoctor", data).subscribe((result) => {
                    // console.log(result);
                    if (result['status']) {

                        Swal.fire(result['message'], '', 'success');

                        this.router.navigate(['hospital/adminPage/doctor/list']);



                    }
                    else {

                        Swal.fire(result['error'], '', 'error');

                        // this.toastr.error(result['error']['message']);
                        this.router.navigate(['hospital/adminPage/doctor/addDoctor']);
                    }

                });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
            }
        });
    }

    doctorAppointmentList(data) {


        return this.http.post("https://localhost:7250/api/Doctor/appointmentList", data);
    }

    approveAppointment(id) {
        // return this.http.put("https://localhost:7250/api/Doctor/approveAppointment",id);

        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Add',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.put("https://localhost:7250/api/Doctor/approveAppointment", id).subscribe((result) => {
                    // console.log(result);
                    if (result['status']) {

                        Swal.fire(result['message'], '', 'success');

                        this.router.navigate(['/hospital/doctorPage/approvedList']);



                    }
                    else {

                        Swal.fire(result['error'], '', 'error');

                        // this.toastr.error(result['error']['message']);
                        this.router.navigate(['/hospital/doctorPage/appointmentList']);
                    }

                });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
            }
        });
    }



    //Department 

    addDepartment(data) {

        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Add',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post("https://localhost:7250/api/Department/addDepartment", data).subscribe((result) => {
                    // console.log(result);
                    if (result['status']) {

                        Swal.fire(result['message'], '', 'success');

                        this.router.navigate(['hospital/adminPage/department/departmentList']);



                    }
                    else {

                        Swal.fire(result['error'], '', 'error');

                        // this.toastr.error(result['error']['message']);
                        this.router.navigate(['hospital/adminPage/doctor/addDepartment']);
                    }

                });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
            }
        });
    }
    departmentList() {
        return this.http.get("https://localhost:7250/api/Department/departmentList");
    }







    //Patient API
    patientDetails() {
        return this.http.get("https://localhost:7250/api/Patient/patientList");
    }

    addAppointment(data) {
        // return this.http.post("https://localhost:7250/api/Patient/addAppointment",data);

        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Add',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post("https://localhost:7250/api/Patient/addAppointment", data).subscribe((result) => {
                    // console.log(result);
                    if (result['status']) {

                        Swal.fire(result['message'], '', 'success');

                        this.router.navigate(['/hospital/patientPage/appointmentDetails']);



                    }
                    else {

                        Swal.fire(result['error'], '', 'error');

                        // this.toastr.error(result['error']['message']);
                        this.router.navigate(['/hospital/patientPage/addAppointment']);
                    }

                });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
            }
        });
    }

    appointmentList() {
        return this.http.get("https://localhost:7250/api/Patient/appointmentList");
    }

    signup(data) {
        // return this.http.post("https://localhost:7250/api/Patient/signup",data);
        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Add',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post("https://localhost:7250/api/Patient/signup", data).subscribe((result) => {
                    // console.log(result);
                    if (result['status']) {

                        Swal.fire(result['message'], '', 'success');

                        this.router.navigate(['/login']);



                    }
                    else {

                        Swal.fire(result['error'], '', 'error');

                        // this.toastr.error(result['error']['message']);
                        this.router.navigate(['/signup']);
                    }

                });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
            }
        });
    }

    patientAppointment(id) {
        // console.log(id);
        return this.http.post("https://localhost:7250/api/Patient/patientAppointmentList", id);
    }

    getPatientId(param1: string) {

        let params = new HttpParams();
        params = params.set('mail', param1);
        // console.log(email);
        return this.http.get("https://localhost:7250/api/Patient/patientId", { params: params });
    }





    //Pathology Api

    pathologyTestList() {
        return this.http.get("https://localhost:7250/api/Pathology/pathologyTest");
    }

    pathologyAmount(id) {
        return this.http.get("https://localhost:7250/api/Pathology/getAmount/" + id);
    }

    pathologyBill(data) {
        // return this.http.post("https://localhost:7250/api/Pathology/pathologyBill",data);


        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Add',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post("https://localhost:7250/api/Pathology/pathologyBill", data).subscribe((result) => {
                    // console.log(result);
                    if (result['status']) {

                        Swal.fire(result['message'], '', 'success');

                        this.router.navigate(['/hospital/adminPage/pathology/pathologyBillList']);



                    }
                    else {

                        Swal.fire(result['error'], '', 'error');

                        // this.toastr.error(result['error']['message']);
                        this.router.navigate(['/hospital/adminPage/pathology/pathologyBill']);
                    }

                });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
            }
        });
    }

    pathologyBillList() {
        return this.http.get("https://localhost:7250/api/Pathology/billList");
    }

    addPathologyTest(data) {

        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Add',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post("https://localhost:7250/api/Pathology/addTest", data).subscribe((result) => {
                    // console.log(result);
                    if (result['status']) {

                        Swal.fire(result['message'], '', 'success');

                        this.router.navigate(['/hospital/adminPage/pathology/pathologyTestList']);



                    }
                    else {

                        Swal.fire(result['error'], '', 'error');

                        // this.toastr.error(result['error']['message']);
                        this.router.navigate(['/hospital/adminPage/pathology/addTest']);
                    }

                });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
            }
        });
    }


    //Payment Method API
    paymentMethodList() {
        return this.http.get("https://localhost:7250/api/PaymentMethod/paymentList");
    }

    //Pharmacy
    addNewMedicine(data) {


        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Add',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post("https://localhost:7250/api/Pharmacy/addMedicines", data).subscribe((result) => {
                    // console.log(result);
                    if (result['status']) {

                        Swal.fire(result['message'], '', 'success');

                        this.router.navigate(['/hospital/adminPage/pharmacy/medicinesList']);



                    }
                    else {

                        Swal.fire(result['error'], '', 'error');

                        // this.toastr.error(result['error']['message']);
                        this.router.navigate(['/hospital/adminPage/pharmacy/addMedicines']);
                    }

                });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
            }
        });
    }
    fetchMedicine() {
        return this.http.get("https://localhost:7250/api/Pharmacy/medicinesList");
    }

    makeBill(data) {

        // return this.http.post("https://localhost:7250/api/Pharmacy/createBill",data);
        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Add',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post("https://localhost:7250/api/Pharmacy/createBill", data).subscribe((result) => {
                    // console.log(result);
                    if (result['status'] == 1) {

                        Swal.fire(result['message'], '', 'success');

                        this.router.navigate(['/hospital/adminPage/pharmacy/billList']);



                    }
                    else if (result['status'] == -1) {

                        Swal.fire(result['error'], '', 'error');

                        this.router.navigate(['/hospital/adminPage/pharmacy/createBill']);

                    }
                    else {

                        Swal.fire(result['error'], '', 'error');

                        // this.toastr.error(result['error']['message']);
                        this.router.navigate(['/hospital/adminPage/pharmacy/createBill']);
                    }

                });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
            }
        });

    }

    getAmountforMed(data) {
        return this.http.post("https://localhost:7250/api/Pharmacy/pharmacyBillAmount", data);
    }

    medicinesBillList(){
        return this.http.get("https://localhost:7250/api/Pharmacy/medicinesBill");
    }



    // CATEGORY API -------------------
    fetchAllCategory(): Observable<object> {


        return this.http.get(this.url + "/category/fetchAllCategory");
    }

    addCategory(data) {

        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Add',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post("https://localhost:7250/api/Doctor", data).subscribe((result) => {
                    // console.log(result);
                    if (result['status']) {

                        Swal.fire(result['success'], '', 'success');

                        this.router.navigate(['/admin/doctor/list']);



                    }
                    else {

                        Swal.fire(result['error'], '', 'error');

                        // this.toastr.error(result['error']['message']);
                        this.router.navigate(['/admin/doctor/addDoctor']);
                    }

                });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
            }
        });
    }

    delCategory_api(id) {


        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post(this.url + "/category/deleteCategory", id)
                    .pipe(tap(() => {
                        this.Refreshrequired.next();
                    }))
                    .subscribe((result) => {
                        // console.log(result);
                        if (result['success']) {

                            Swal.fire(result['payload']['message'], '', 'success');

                        }
                        else {

                            Swal.fire(result['error']['message'], '', 'error');

                        }

                    });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
            }
        });

    }


    updateCategory(data) {

        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Update',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post(this.url + "/category/editCategory", data).subscribe((result) => {
                    console.log(result);
                    if (result['success']) {

                        Swal.fire(result['payload']['message'], '', 'success');

                        this.router.navigate(['/admin/category']);



                    }
                    else {

                        Swal.fire(result['error']['message'], '', 'error');

                        // this.toastr.error(result['error']['message']);
                        this.router.navigate(['/admin/category']);
                    }

                });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
                this.router.navigate(['/admin/category']);
            }
        });


    }

    statusCategory(categoryId) {


        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post(this.url + "/category/statusChange", categoryId)
                    .pipe(tap(() => {
                        this.Refreshrequired.next();
                    }))
                    .subscribe((result) => {
                        // console.log(result);
                        if (result['success']) {

                            Swal.fire(result['payload']['message'], '', 'success');

                        }
                        else {

                            Swal.fire(result['error']['message'], '', 'error');

                        }

                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
                this.Refreshrequired.next();
            }
        });
    }



    // NEWS API -----------------------

    fetchNews() {
        return this.http.get(this.url + "/admin/fetchAllNews");
    }

    blockNews(data) {


        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Block',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post(this.url + "/admin/blockNews", data)
                    .pipe(tap(() => {
                        this.Refreshrequired.next();
                    }))
                    .subscribe((result) => {
                        // console.log(result);
                        if (result['success']) {

                            Swal.fire(result['payload']['message'], '', 'success');




                        }
                        else {

                            Swal.fire(result['error']['message'], '', 'error');

                            // this.toastr.error(result['error']['message']);
                        }

                    });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
            }
        });

    }

    updateNews(data, id) {

        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Update',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post(this.url + "/admin/editNews", data)
                    .pipe(tap(() => {
                        this.Refreshrequired.next();
                    }))
                    .subscribe((result) => {

                        if (result['success']) {

                            Swal.fire(result['payload']['message'], '', 'success');


                            this.router.navigate(['/admin/dashboard/news/:id', { id: id }]);



                        }
                        else {

                            Swal.fire(result['error']['message'], '', 'error');

                            // this.toastr.error(result['error']['message']);
                            this.router.navigate(['/admin/update/:id', { id: id }]);




                        }

                    });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
                this.router.navigate(['/admin/dashboard/news/:id', { id: id }]);

            }
        });
    }
    uploadNews(data) {
        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Upload',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post(this.url + "/admin/verifyNews", data)
                    .pipe(tap(() => {
                        this.Refreshrequired.next();
                    }))
                    .subscribe((result) => {

                        if (result['success']) {

                            Swal.fire(result['payload']['message'], '', 'success');


                            this.router.navigate(['/admin/dashboard/history']);



                        }
                        else {

                            Swal.fire(result['error']['message'], '', 'error');

                            // this.toastr.error(result['error']['message']);
                            this.router.navigate(['/admin/dashboard/newpost']);




                        }

                    });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');


            }
        });
    }


    // USER API ------------------------

    fetchAllUsers() {
        return this.http.get(this.url + "/admin/fetchAllUsers");
    }

    userVerified(data) {


        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post(this.url + "/admin/verifyUser", data)
                    .pipe(tap(() => {
                        this.Refreshrequired.next()
                    }))
                    .subscribe((result) => {
                        console.log(result);
                        if (result['success']) {

                            Swal.fire(result['payload']['message'], '', 'success');




                        }
                        else {

                            Swal.fire(result['error']['message'], '', 'error');

                            // this.toastr.error(result['error']['message']);
                        }

                    });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
            }
        });
    }

    userRejected(data) {
        // this.http.post(this.url + "/admin/blockUser", data)
        //     .pipe(tap(() => {
        //         this.Refreshrequired.next();
        //     }))
        //     .subscribe((result) => {
        //         // console.log(result);
        //         if (result['success']) {
        //             this.toastr.success(result['payload']['message']);


        //         }


        //         else {
        //             this.toastr.error(result['error']['message']);

        //         }
        //     })

        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post(this.url + "/admin/regectUser", data)
                    .pipe(tap(() => {
                        this.Refreshrequired.next()
                    }))
                    .subscribe((result) => {
                        console.log(result);
                        if (result['success']) {

                            Swal.fire(result['payload']['message'], '', 'success');




                        }
                        else {

                            Swal.fire(result['error']['message'], '', 'error');

                            // this.toastr.error(result['error']['message']);
                        }

                    });

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
            }
        });
    }

    fetchNewsByUserId(data) {
        return this.http.post(this.url + "/admin/fetchNewsByID", data);
    }


    userStatus(userId) {


        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post(this.url + "/admin/toggleUserStatus", userId)
                    .pipe(tap(() => {
                        this.Refreshrequired.next();
                    }))
                    .subscribe((result) => {
                        // console.log(result);
                        if (result['success']) {

                            Swal.fire(result['payload']['message'], '', 'success');

                        }
                        else {

                            Swal.fire(result['error']['message'], '', 'error');

                        }

                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
                this.Refreshrequired.next();
            }
        });
    }


    // Agent API -----------------------

    allAgent() {
        return this.http.get(this.url + "/agent/fetchAllAgents");

    }

    createAgent(data) {


        Swal.fire({
            title: 'Are you sure?',
            text: '',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Create',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.value) {
                this.http.post(this.url + "/agent/addAgent", data)
                    .subscribe((result) => {
                        // console.log(result);
                        if (result['success']) {

                            Swal.fire(result['payload']['message'], '', 'success');
                            this.router.navigate(['/admin/agentList']);

                        }
                        else {

                            Swal.fire(result['error']['message'], '', 'error');
                            this.router.navigate(['/admin/createAgent']);

                        }

                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Cancelled', '', 'error');
                this.Refreshrequired.next();
            }
        });

    }


























}
