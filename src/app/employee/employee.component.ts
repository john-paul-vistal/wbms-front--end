import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { ApiService } from '../service/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  staff;
  search: any;
  page: Number = 1;
  constructor(
    private authenticationService: AuthenticationService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticationService.authenticate('employee');
    if (localStorage.getItem('UserType') != 'ADMIN') {
      alert('Not Authorized Access!');
      this.router.navigate(['/dashboard']);
    }
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

  Search() {
    if (this.search == '') {
      this.ngOnInit();
    } else {
      this.staff = this.staff.filter(res => {
        return (
          res.firstName
            .toLocaleLowerCase()
            .match(this.search.toLocaleLowerCase()) ||
          res.lastName
            .toLocaleLowerCase()
            .match(this.search.toLocaleLowerCase()) ||
          res.address.toLocaleLowerCase().match(this.search.toLocaleLowerCase())
        );
      });
    }
  }

  toggle() {
    $('#wrapper').toggleClass('toggled');
  }
}
