import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { ApiService } from '../service/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-reading',
  templateUrl: './reg-reading.component.html',
  styleUrls: ['./reg-reading.component.scss']
})
export class RegReadingComponent implements OnInit {
  today;
  saving = false;
  saved = false;
  constructor(
    public authenticationService: AuthenticationService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let date = new Date();
    this.today =
      date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate();
    this.authenticationService.authenticate('register-reading');
  }

  onSubmit(data) {
    console.log(data);
    let url = 'https://wbm-system.herokuapp.com/api/transaction/create';
    this.apiService.saveData(url, data).subscribe(
      result => {
        this.saved = true;
        this.saving = false;
        setTimeout(() => {
          this.router.navigate(['/pending-transactions']);
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
