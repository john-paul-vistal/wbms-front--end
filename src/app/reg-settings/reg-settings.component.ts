import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { ApiService } from '../service/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-settings',
  templateUrl: './reg-settings.component.html',
  styleUrls: ['./reg-settings.component.scss']
})
export class RegSettingsComponent implements OnInit {
  emptySettingName = false;
  emptyValue = false;
  saved = false;
  saving = false;

  constructor(
    private authenticationService: AuthenticationService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticationService.authenticate('register-setting');
  }

  onSubmit(data) {
    if (this.checkForm(data) == true) {
      console.log(data);
      let url = 'https://wbm-system.herokuapp.com/api/settings/create';
      this.apiService.saveData(url, data).subscribe(
        result => {
          this.saved = true;
          this.saving = false;
          setTimeout(() => {
            this.router.navigate(['/settings']);
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

  checkForm(data) {
    this.emptySettingName = false;
    this.emptyValue = false;

    if (data.settingName == '') {
      this.emptySettingName = true;
    }
    if (data.value == '') {
      this.emptyValue = true;
    }

    if (this.emptySettingName == false && this.emptyValue == false) {
      return true;
    }
  }
}
