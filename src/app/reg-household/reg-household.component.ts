import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { ApiService } from '../service/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-household',
  templateUrl: './reg-household.component.html',
  styleUrls: ['./reg-household.component.scss']
})
export class RegHouseholdComponent implements OnInit {
  emptyFirstName = false;
  emptyLastName = false;
  emptyMiddleName = false;
  emptyaddress = false;
  emptypurok = false;
  saving = false;
  saved = false;

  constructor(
    private authenticationService: AuthenticationService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticationService.authenticate('register-household');
  }

  onSubmit(data) {
    if (this.checkForm(data) == true) {
      this.saving = true;
      let customerData = {
        firstName: data['firstName'],
        lastName: data['lastName'],
        middleName: data['middleName'],
        email: data['email'],
        address: data['address'] + ' - ' + data['streetAddress'],
        contactNumber: data['contactNumber']
      };
      let url = 'https://wbm-system.herokuapp.com/api/customer/create';
      this.apiService.saveData(url, customerData).subscribe(
        result => {
          this.saved = true;
          this.saving = false;
          setTimeout(() => {
            this.router.navigate(['/household-records']);
          }, 1500);
          console.log(result);
        },
        error => {
          this.saving = false;
          console.log(error);
        }
      );
    }
  }

  checkForm(data) {
    this.emptyFirstName = false;
    this.emptyLastName = false;
    this.emptyMiddleName = false;
    this.emptyaddress = false;
    this.emptypurok = false;

    if (data.firstName == '') {
      this.emptyFirstName = true;
    }
    if (data.lastName == '') {
      this.emptyLastName = true;
    }
    if (data.middleName == '') {
      this.emptyMiddleName = true;
    }
    if (data.address == '') {
      this.emptyaddress = true;
    }
    if (data.streetAddress == '') {
      this.emptypurok = true;
    }

    if (
      this.emptyFirstName == false &&
      this.emptyLastName == false &&
      this.emptyMiddleName == false &&
      this.emptyaddress == false &&
      this.emptypurok == false
    ) {
      return true;
    }
  }
}
