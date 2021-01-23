import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { SignInData } from '../model/signInData';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.onload();
  }

  onSubmit(data) {
    const signInData = new SignInData(data['username'], data['password']);
    this.authenticationService.authenticate(signInData);
    // this.router.navigate(['/dashboard']);
    // console.log(data);
    // this.http
    //   .post('https://wbm-system.herokuapp.com/api/login', data)
    //   .subscribe(result => {
    //     console.log(result);
    //     //SAve this to as cookie

    //     // this._cookieService.put('Authorization',result['token']);
    //   });
  }

  onload() {
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer 15|2nZtjyXSviulHH9Rk72e9psq8YPIf1wQ9gkfszHp'
    });
    this.http
      .get('https://wbm-system.herokuapp.com/api/staff', {
        headers: httpHeaders
      })
      .subscribe(result => {
        console.log(result['data']);
      });
  }
}
