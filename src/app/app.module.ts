import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import * as bootstrap from 'bootstrap';
import * as $ from 'jquery';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { TransactionComponent } from './transaction/transaction.component';
import { CustomerComponent } from './customer/customer.component';
import { EmployeeComponent } from './employee/employee.component';
import { SettingsComponent } from './settings/settings.component';
import { RegHouseholdComponent } from './reg-household/reg-household.component';
import { ProfileComponent } from './profile/profile.component';
import { RegEmployeeComponent } from './reg-employee/reg-employee.component';
import { RegSettingsComponent } from './reg-settings/reg-settings.component';
import { RegReadingComponent } from './reg-reading/reg-reading.component';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';
import { UpdateSettingsComponent } from './update-settings/update-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    CreateTransactionComponent,
    TransactionComponent,
    CustomerComponent,
    EmployeeComponent,
    SettingsComponent,
    RegHouseholdComponent,
    ProfileComponent,
    RegEmployeeComponent,
    RegSettingsComponent,
    RegReadingComponent,
    StaffProfileComponent,
    UpdateSettingsComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
