import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from '@/app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from '@modules/main/main.component';
import { LoginComponent } from '@modules/login/login.component';
import { HeaderComponent } from '@modules/main/header/header.component';
import { FooterComponent } from '@modules/main/footer/footer.component';


import { ProfileComponent } from '@pages/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';

import { PrivacyPolicyComponent } from './modules/privacy-policy/privacy-policy.component';
import { MainMenuComponent } from './pages/main-menu/main-menu.component';
import { SubMenuComponent } from './pages/main-menu/sub-menu/sub-menu.component';

import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth/reducer';
import { uiReducer } from './store/ui/reducer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChartsComponent } from './pages/charts/charts.component';
import { UsersComponent } from './pages/users/users.component';
import { NewPostComponent } from './pages/new-post/new-post.component';
import { NewsComponent } from './pages/news/news.component';
import { UpdateComponent } from './pages/update/update.component';
import { HistoryComponent } from './pages/history/history.component';
import { CategoryComponent } from './pages/category/category.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UpdateSettingsComponent } from './pages/update-settings/update-settings.component';
import { UpdateCategoryComponent } from './pages/update-category/update-category.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';

import { SidebarComponent } from './modules/main/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { NewUserComponent } from './pages/new-user/new-user.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateAgentComponent } from './pages/create-agent/create-agent.component';
import { AgentListComponent } from './pages/agent-list/agent-list.component';
import { DoctorListComponent } from './pages/doctor/doctor-list/doctor-list.component';
import { AddDoctorComponent } from './pages/doctor/add-doctor/add-doctor.component';
import { TokenInterceptorService } from '@services/token-interceptor.service';
import { AddTestComponent } from './pages/pathologist/add-test/add-test.component';
import { PathologistBillComponent } from './pages/pathologist/pathologist-bill/pathologist-bill.component';
import { PascalCasePipe } from './pipe/pascal-case.pipe';
import { BillListComponent } from './pages/pathologist/bill-list/bill-list.component';
import { TestListComponent } from './pages/pathologist/test-list/test-list.component';
import { AddMedicinesComponent } from './pages/pharmacy/add-medicines/add-medicines.component';
import { MedicinesListComponent } from './pages/pharmacy/medicines-list/medicines-list.component';
import { CreateMedicinesBillComponent } from './pages/pharmacy/create-medicines-bill/create-medicines-bill.component';
import { MyAppointmentComponent } from './patient/my-appointment/my-appointment.component';
import { AddAppointmentComponent } from './patient/add-appointment/add-appointment.component';
import { PharmacyBillListComponent } from './pages/pharmacy/pharmacy-bill-list/pharmacy-bill-list.component';
import { SignUpComponent } from './patient/sign-up/sign-up.component';
import { AppointmentListComponent } from './doctor/appointment-list/appointment-list.component';
import { ApprovedListComponent } from './doctor/approved-list/approved-list.component';
import { AddDepartmentComponent } from './pages/doctor/add-department/add-department.component';
import { DepartmentListComponent } from './pages/doctor/department-list/department-list.component';
import { PatientListComponent } from './pages/patient-list/patient-list.component';
import { PatientAppointmentLstComponent } from './pages/patient-appointment-lst/patient-appointment-lst.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UpdateStockComponent } from './pages/pharmacy/update-stock/update-stock.component';




registerLocaleData(localeEn, 'en-EN');

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,



        ProfileComponent,







        PrivacyPolicyComponent,
        MainMenuComponent,
        SubMenuComponent,






        ChartsComponent,
        UsersComponent,
        NewPostComponent,
        NewsComponent,
        UpdateComponent,
        HistoryComponent,

        CategoryComponent,
        SettingsComponent,
        UpdateSettingsComponent,
        UpdateCategoryComponent,
        AddCategoryComponent,

        SidebarComponent,
        PageNotFoundComponent,
        DashboardComponent,
        NewUserComponent,
        CreateAgentComponent,
        AgentListComponent,
        DoctorListComponent,
        AddDoctorComponent,
        AddTestComponent,
        PathologistBillComponent,
        PascalCasePipe,
        BillListComponent,
        TestListComponent,
        AddMedicinesComponent,
        MedicinesListComponent,
        CreateMedicinesBillComponent,
        MyAppointmentComponent,
        AddAppointmentComponent,
        PharmacyBillListComponent,
        SignUpComponent,
        AppointmentListComponent,
        ApprovedListComponent,
        AddDepartmentComponent,
        DepartmentListComponent,
        PatientListComponent,
        PatientAppointmentLstComponent,
        HomePageComponent,
        UpdateStockComponent,





    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ auth: authReducer, ui: uiReducer }),
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        NgbModule,
        FormsModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,

    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule { }
