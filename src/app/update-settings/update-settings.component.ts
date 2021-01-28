import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { ApiService } from '../service/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-settings',
  templateUrl: './update-settings.component.html',
  styleUrls: ['./update-settings.component.scss']
})
export class UpdateSettingsComponent implements OnInit {
  emptySettingName = false;
  emptyValue = false;
  saved = false;
  saving = false;
  settingInfo;
  value;
  settingName;
  settings;

  constructor(
    private authenticationService: AuthenticationService,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  settingID;
  ngOnInit(): void {
    this.settingID = this.route.snapshot.queryParamMap.get('settingsID');
    this.authenticationService.authenticate(
      'update-settings?settingsID=' + this.settingID
    );
    this.loadSettingInfo(this.settingID);
    console.log(this.settingID);

    // this.onSubmit(data);
  }

  onSubmit(data) {
    console.log(data);
    let url = 'https://wbm-system.herokuapp.com/api/settings/update';
    this.apiService.updateData(url, data, this.settingID).subscribe(
      result => {
        // this.editable =false;
        // this.saving = false;
        // this.showButtons = false;
        console.log(result);
        this.loadSettingInfo(this.settingID);

        this.router.navigate(['/settings']);
      },
      error => {
        this.saving = false;
        console.log(error);
      }
    );
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

  loadSettingInfo(settingID) {
    let settingData;
    let url = 'https://wbm-system.herokuapp.com/api/settings/show';
    this.apiService.getSpecificData(url, settingID).subscribe(
      result => {
        settingData = result;
        this.settingInfo = settingData;
        console.log(this.settingInfo);

        this.settingName = result['settingName'];
        this.value = result['value'];
      },
      error => {
        console.log(error);
      }
    );
  }
}
