import { Injectable } from '@angular/core';
import { SignInData } from 'src/app/model/signInData';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated;
  userLogged;

  constructor(private router: Router) {}

  authenticate(link): boolean {
    if (localStorage.getItem('AuthorazationToken') != null) {
      this.isAuthenticated = true;
      this.userLogged = localStorage.getItem('User');
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
}
