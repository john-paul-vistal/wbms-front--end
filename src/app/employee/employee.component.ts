import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  staff;
  page: Number = 1;
  constructor(
    private authenticationService: AuthenticationService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.authenticationService.authenticate('employee');
    this.loadCustomerInfo();
  }

  loadCustomerInfo() {
    let url = 'https://wbm-system.herokuapp.com/api/staff';
    this.apiService.getData(url).subscribe(
      result => {
        this.staff = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  pageChanged(page: Event) {
    page = page;
  }

  toggle() {
    $('#wrapper').toggleClass('toggled');
  }
}
