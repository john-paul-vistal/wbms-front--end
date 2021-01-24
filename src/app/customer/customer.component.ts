import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  householdRecords;
  search: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.authenticationService.authenticate('household-records');
    this.getHouseholdRecords();
  }

  getHouseholdRecords() {
    let resultData;
    let url = 'https://wbm-system.herokuapp.com/api/customer';
    this.apiService.getData(url).subscribe(
      result => {
        console.log(result);
        resultData = result['data'];
        this.householdRecords = resultData;
      },
      error => {
        console.log(error);
      }
    );
  }

  Search() {
    if (this.search == '') {
      this.ngOnInit();
    } else {
      this.householdRecords = this.householdRecords.filter(res => {
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
}
