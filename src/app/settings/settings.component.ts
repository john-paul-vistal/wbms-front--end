import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { ApiService } from '../service/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings;
  deleted;
  constructor(
    private authenticationService: AuthenticationService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticationService.authenticate('settings');
    this.loadSettingsData();
  }

  loadSettingsData() {
    let url = 'https://wbm-system.herokuapp.com/api/settings';
    this.apiService.getData(url).subscribe(
      result => {
        this.settings = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  onClickDelete(id) {
    let url = 'https://wbm-system.herokuapp.com/api/settings/delete/';
    this.apiService.updateData(url, '', id).subscribe(
      result => {
        this.deleted = true;
        setTimeout(() => {
          this.deleted = false;
          this.loadSettingsData();
        }, 1000);
        console.log(result);
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
