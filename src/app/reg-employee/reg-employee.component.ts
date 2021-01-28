import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { ApiService } from '../service/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-employee',
  templateUrl: './reg-employee.component.html',
  styleUrls: ['./reg-employee.component.scss']
})
export class RegEmployeeComponent implements OnInit {
  emptyFirstName = false;
  emptyLastName = false;
  emptyMiddleName = false;
  emptyaddress = false;
  emptyEmail = false;
  emptyUserType = false;
  emptyGender = false;
  invalidNumber = false;
  saved = false;
  saving = false;

  constructor(
    private authenticationService: AuthenticationService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticationService.authenticate('register-employee');
  }

  onSubmit(data) {
    if (this.checkForm(data) == true) {
      console.log(data);
      this.saving = true;
      let url = 'https://wbm-system.herokuapp.com/api/staff/create';
      this.apiService.saveData(url, data).subscribe(
        result => {
          this.saved = true;
          this.saving = false;
          setTimeout(() => {
            this.router.navigate(['/employee']);
          }, 1000);
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
    this.emptyGender = false;
    this.emptyUserType = false;
    this.emptyEmail = false;
    this.invalidNumber = false;

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
    if (data.gender == '') {
      this.emptyGender = true;
    }
    if (data.usertype == '') {
      this.emptyUserType = true;
    }
    if (data.email == '') {
      this.emptyEmail = true;
    }
    if (
      data.contactNumber == '' ||
      data.contactNumber.length > 11 ||
      data.contactNumber.length < 7
    ) {
      this.invalidNumber = true;
    }

    if (
      this.emptyFirstName == false &&
      this.emptyLastName == false &&
      this.emptyMiddleName == false &&
      this.emptyaddress == false &&
      this.emptyEmail == false &&
      this.emptyGender == false &&
      this.emptyUserType == false &&
      this.invalidNumber == false
    ) {
      return true;
    }
  }

  toggle() {
    $('#wrapper').toggleClass('toggled');
  }
}
