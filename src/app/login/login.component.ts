import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

// import {CookieService} from 'angular2-cookie/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }


  onSubmit(data){
    this.http.post('https://wbm-system.herokuapp.com/api/login',data)
    .subscribe((result)=>{

      console.log(result['token']);
      //SAve this to as cookie

      // this._cookieService.put('Authorization',result['token']);
    })
  }

  

}
