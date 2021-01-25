import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../service/authentication/authentication.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usernameInvalid;
  passwordInvalid;
  incorrectCredentials;
  waitResponse = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    if (
      this.authenticationService.isAuthenticated ||
      localStorage.getItem('AuthorazationToken') != null
    ) {
      this.router.navigate(['dashboard']);
    }
  }

  onSubmit(data) {
    console.log('Loging In .... ');
    this.usernameInvalid = false;
    this.passwordInvalid = false;
    this.incorrectCredentials = false;

    if (data['username'] == '') {
      this.usernameInvalid = true;
    }
    if (data['password'] == '') {
      this.passwordInvalid = true;
    }

    if (this.usernameInvalid == false && this.passwordInvalid == false) {
      this.waitResponse = true;
      this.http
        .post('https://wbm-system.herokuapp.com/api/login', data)
        .subscribe(
          result => {
            console.log('Successfully Logged In');
            localStorage.setItem('UserID', result['user']['id']);
            localStorage.setItem('AuthorazationToken', result['token']);
            localStorage.setItem(
              'User',
              result['user']['firstName'] + ' ' + result['user']['lastName']
            );
            this.waitResponse = true;
            this.authenticationService.authenticate('dashboard');
          },
          errors => {
            console.log(errors);
            this.waitResponse = false;
            this.incorrectCredentials = true;
          }
        );
    }
  }
}
