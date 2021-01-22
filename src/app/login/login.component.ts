import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.onload();
  }

  onSubmit(data) {
    this.http
      .post('https://wbm-system.herokuapp.com/api/login', data)
      .subscribe(result => {
        console.log(result);
        //SAve this to as cookie

        // this._cookieService.put('Authorization',result['token']);
      });
  }

  onClick() {
    const httpHeaders = new HttpHeaders({
      Authorization: 'Bearer 15|2nZtjyXSviulHH9Rk72e9psq8YPIf1wQ9gkfszHp'
    });
    this.http
      .get('https://wbm-system.herokuapp.com/api/staff', {
        headers: httpHeaders
      })
      .subscribe(result => {
        console.log(result['data']['username'] == 'jvistal687');
      });
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
