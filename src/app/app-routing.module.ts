import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { TransactionComponent } from './transaction/transaction.component';
import { CustomerComponent } from './customer/customer.component';
import { EmployeeComponent } from './employee/employee.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { RegHouseholdComponent } from './reg-household/reg-household.component';
import { RegReadingComponent } from './reg-reading/reg-reading.component';
import { RegEmployeeComponent } from './reg-employee/reg-employee.component';
import { RegSettingsComponent } from './reg-settings/reg-settings.component';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';


import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: LandingPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pending-transactions',
    component: CreateTransactionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'transaction-records',
    component: TransactionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'household-records',
    component: CustomerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'household/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register-household',
    component: RegHouseholdComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register-reading',
    component: RegReadingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register-employee',
    component: RegEmployeeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register-setting',
    component: RegSettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'staff-profile',
    component: StaffProfileComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
