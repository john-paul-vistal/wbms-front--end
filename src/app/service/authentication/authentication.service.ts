import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated;
  userLogged;
  userID;
  userLoggedLevel;
  activateHousehold;
  activateEmployee;
  activateSetting;

  constructor(private router: Router) {}

  authenticate(link): boolean {
    if (localStorage.getItem('AuthorazationToken') != null) {
      this.isAuthenticated = true;
      this.userLogged = localStorage.getItem('User');
      this.userID = localStorage.getItem('UserID');
      this.checkLevel();
      this.userLoggedLevel = localStorage.getItem('UserType');
      this.router.navigate([link]);
      return true;
    }
    this.isAuthenticated = false;
    this.router.navigate(['']);
    return false;
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['']);
  }

  checkLevel() {
    if (localStorage.getItem('UserType') == 'ADMIN') {
      this.activateHousehold = true;
      this.activateEmployee = true;
      this.activateSetting = true;
    } else if (localStorage.getItem('UserType') == 'MANAGER') {
      this.activateHousehold = true;
      this.activateEmployee = false;
      this.activateSetting = false;
    } else {
      this.activateHousehold = false;
      this.activateEmployee = false;
      this.activateSetting = false;
    }
  }
}
