import { Injectable } from '@angular/core';
import { SignInData } from 'src/app/model/signInData';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly mockedUser = new SignInData('jvistal687', 'P@ssw0rd');
  isAuthenticated = false;

  constructor(private router: Router) {}

  authenticate(signInData: SignInData): boolean {
    console.log(signInData['username']);
    if (signInData['username'] === 'jvistal') {
      this.isAuthenticated = true;
      this.router.navigate(['/dashboard']);
      return true;
    }

    // if (this.checkCredentials(signInData)) {
    //   this.isAuthenticated = true;
    //   this.router.navigate(['/dashboard']);
    //   return true;
    // }
    // this.isAuthenticated = true;
    // return false;
  }

  private checkCredentials(signInData: SignInData): boolean {
    return (
      this.checkUsername(signInData.getUsername()) &&
      this.checkPassword(signInData.getPassword())
    );
  }

  private checkUsername(username: String): boolean {
    return username === this.mockedUser.getUsername();
  }

  private checkPassword(password: String): boolean {
    return password === this.mockedUser.getPassword();
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['']);
  }
}
