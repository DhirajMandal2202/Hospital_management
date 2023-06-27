
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '@modules/main/main.component';
import { LoginComponent } from '@modules/login/login.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { AuthGuard } from '@guards/auth.guard';
import { NonAuthGuard } from '@guards/non-auth.guard';

import { PrivacyPolicyComponent } from '@modules/privacy-policy/privacy-policy.component';
import { ChartsComponent } from '@pages/charts/charts.component';
import path from 'path';
import { UsersComponent } from '@pages/users/users.component';
import { NewPostComponent } from '@pages/new-post/new-post.component';
import { NewsComponent } from '@pages/news/news.component';
import { UpdateComponent } from '@pages/update/update.component';
import { HistoryComponent } from '@pages/history/history.component';

import { CategoryComponent } from '@pages/category/category.component';
import { SettingsComponent } from '@pages/settings/settings.component';
import { UpdateSettingsComponent } from '@pages/update-settings/update-settings.component';
import { UpdateCategoryComponent } from '@pages/update-category/update-category.component';
import { AddCategoryComponent } from '@pages/add-category/add-category.component';
import { PageNotFoundComponent } from '@pages/page-not-found/page-not-found.component';
import { NewUserComponent } from '@pages/new-user/new-user.component';
import { CreateAgentComponent } from '@pages/create-agent/create-agent.component';
import { AgentListComponent } from '@pages/agent-list/agent-list.component';
import { DoctorListComponent } from '@pages/doctor/doctor-list/doctor-list.component';
import { AddDoctorComponent } from '@pages/doctor/add-doctor/add-doctor.component';
import { AddTestComponent } from '@pages/pathologist/add-test/add-test.component';
import { PathologistBillComponent } from '@pages/pathologist/pathologist-bill/pathologist-bill.component';
import { BillListComponent } from '@pages/pathologist/bill-list/bill-list.component';
import { TestListComponent } from '@pages/pathologist/test-list/test-list.component';
import { AddMedicinesComponent } from '@pages/pharmacy/add-medicines/add-medicines.component';
import { MedicinesListComponent } from '@pages/pharmacy/medicines-list/medicines-list.component';
import { CreateMedicinesBillComponent } from '@pages/pharmacy/create-medicines-bill/create-medicines-bill.component';
import { PharmacyBillListComponent } from '@pages/pharmacy/pharmacy-bill-list/pharmacy-bill-list.component';
import { AddAppointmentComponent } from './patient/add-appointment/add-appointment.component';
import { MyAppointmentComponent } from './patient/my-appointment/my-appointment.component';
import { SignUpComponent } from './patient/sign-up/sign-up.component';
import { AppointmentListComponent } from './doctor/appointment-list/appointment-list.component';
import { AddDepartmentComponent } from '@pages/doctor/add-department/add-department.component';
import { DepartmentListComponent } from '@pages/doctor/department-list/department-list.component';
import { Children } from '@amcharts/amcharts5/.internal/core/util/Children';
import { ApprovedListComponent } from './doctor/approved-list/approved-list.component';
import { PatientListComponent } from '@pages/patient-list/patient-list.component';
import { PatientAppointmentLstComponent } from '@pages/patient-appointment-lst/patient-appointment-lst.component';
import { HomePageComponent } from '@pages/home-page/home-page.component';
import { UpdateStockComponent } from '@pages/pharmacy/update-stock/update-stock.component';


const routes: Routes = [
  {
    path: 'hospital',
    component: MainComponent,
    canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    children: [



      //Admin Routing -----------------------------------------
      {
        path: 'adminPage',
        children: [

          //Welcome page
          { path: 'welcomePage', component: HomePageComponent },

          //Dashboard page

          {
            path: 'dashboard',
            component: DashboardComponent,
            children: [
              { path: 'charts', component: ChartsComponent },
              { path: 'users', component: UsersComponent },
              { path: 'newpost', component: NewPostComponent },
              { path: 'news/:id', component: NewsComponent },
              { path: 'update/:id', component: UpdateComponent },
              { path: 'history', component: HistoryComponent },
              { path: 'newUser', component: NewUserComponent },

              { path: '', redirectTo: 'charts', pathMatch: 'full' },


            ]
          },
          //doctor
          {
            path: 'doctor',
            children: [
              {
                path: 'addDoctor', component: AddDoctorComponent
              },
              {
                path: "list", component: DoctorListComponent
              },

              { path: '', redirectTo: 'list', pathMatch: 'full' },

            ]
          },

          //Department --------------------------------------

          {
            path: 'department', children: [
              {
                path: 'addDepartment', component: AddDepartmentComponent
              },
              {
                path: 'departmentList', component: DepartmentListComponent

              },
              { path: '', redirectTo: 'departmentList', pathMatch: 'full' },
            ]

          },

          //Pathology ------------------------------------------
          {
            path: 'pathology',
            children: [
              {
                path: 'addTest', component: AddTestComponent
              },
              {
                path: 'pathologyBill', component: PathologistBillComponent
              },
              {
                path: 'pathologyBillList', component: BillListComponent
              },
              {
                path: 'pathologyTestList', component: TestListComponent
              },
              
              { path: '', redirectTo: 'pathologyTestList', pathMatch: 'full' },
            ]
          },

          //Pharmacy ----------------------------------------------

          {
            path: 'pharmacy',
            children: [
              {
                path: 'addMedicines', component: AddMedicinesComponent
              },
              {
                path: 'medicinesList', component: MedicinesListComponent
              },
              {
                path: 'createBill', component: CreateMedicinesBillComponent
              },
              {
                path: 'billList', component: PharmacyBillListComponent
              },
              {
                path: 'updateStock', component: UpdateStockComponent
              },
              {
                path: '', redirectTo: 'billList', pathMatch: 'full'
              }

            ]
          },

          //Patient -------------------------------------------------
          {
            path: 'patientDetails',
            children: [
              { path: 'patientList', component: PatientListComponent },
              { path: "patientAppointmentList", component: PatientAppointmentLstComponent },
              { path: "", redirectTo: "patientList", pathMatch: 'full' }
            ]
          },
          { path: '', redirectTo: 'welcomePage', pathMatch: 'full' },




        ]
      },


      //Patient Routing ----------------------------------------

      {

        path: 'patientPage',
        children: [
          { path: 'homePage', component: HomePageComponent },
          {
            path: 'addAppointment', component: AddAppointmentComponent
          },
          {
            path: 'appointmentDetails', component: MyAppointmentComponent
          },
          {
            path: '', redirectTo: 'homePage', pathMatch: 'full'
          }

        ]

      },

      //doctor Rouing -------------------------------------------

      {

        path: 'doctorPage',
        children: [
          { path: 'homePage', component: HomePageComponent },
          {
            path: 'appointmentList', component: AppointmentListComponent
          },
          {
            path: 'approvedList', component: ApprovedListComponent
          },
          {
            path: '', redirectTo: 'homePage', pathMatch: 'full'
          },

        ]

      },





















      {
        path: 'appointment',
        children: [
          {
            path: 'appointmentList', component: AppointmentListComponent
          },
          {
            path: 'addAppointment', component: AddAppointmentComponent
          },
          {
            path: '', redirectTo: 'appointmentList', pathMatch: 'full'

          }
        ]
      },







      {
        path: 'updateCategory/:id/:status/:category_name', component: UpdateCategoryComponent
      },







    ]
  },


  {
    path: 'login',
    component: LoginComponent,

  },

  {
    path: 'signup',
    component: SignUpComponent
  },






  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    // canActivate: [NonAuthGuard]
  },
  {
    path: 'pageNotFound',
    component: PageNotFoundComponent,
    // canActivate: [NonAuthGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'pageNotFound', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
