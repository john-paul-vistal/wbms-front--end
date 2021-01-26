import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-reg-reading',
  templateUrl: './reg-reading.component.html',
  styleUrls: ['./reg-reading.component.scss']
})
export class RegReadingComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.authenticate('register-reading');
  }
}
