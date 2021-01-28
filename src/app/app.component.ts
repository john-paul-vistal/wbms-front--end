import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication/authentication.service';
import { ApiService } from './service/api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wmbs-project';
  constructor(
    public authenticationService: AuthenticationService,
    private apiService: ApiService
  ) {}

  logout() {
    let url = 'https://wbm-system.herokuapp.com/api/logout';
    this.apiService.logout(url, '').subscribe(
      result => {
        console.log(result);
        localStorage.removeItem('User');
        localStorage.removeItem('UserID');
        localStorage.removeItem('UserType');
        localStorage.removeItem('AuthorazationToken');
        this.authenticationService.logout();
      },
      error => {
        console.log(error);
      }
    );
  }
  toggle() {
    $('#wrapper').toggleClass('toggled');
  }
}
