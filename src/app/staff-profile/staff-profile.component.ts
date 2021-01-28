import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styleUrls: ['./staff-profile.component.scss']
})
export class StaffProfileComponent implements OnInit {
  staff;
  username;
  password = 'P@ssw0rd';
  displayPassword = '***************';
  firstName;
  lastName;
  middleName;
  email;
  contactNumber;
  address;
  usertype;
  fullName;
  gender;
  phoneNumber;
  showEditBtn = false;
  staffId;
  showButtons = false;
  showReset = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.staffId = this.route.snapshot.queryParamMap.get('staffID');
    const parent: string = this.route.snapshot.queryParamMap.get('parent');

    if (parent == '2') {
      this.showEditBtn = false;
      this.showReset = true;
      this.password = 'P@ssw0rd';
    } else if (parent == '1') {
      this.showEditBtn = true;
    }

    this.loadInfoData(this.staffId);
  }

  loadInfoData(staffId) {
    let url = 'https://wbm-system.herokuapp.com/api/staff/show';
    this.apiService.getSpecificData(url, staffId).subscribe(
      result => {
        this.staff = result;
        this.firstName = result['firstName'];
        this.middleName = result['middleName'];
        this.lastName = result['lastName'];
        this.username = result['username'];
        this.gender = result['gender'];
        this.email = result['email'];
        this.contactNumber = result['contactNumber'];
        this.address = result['address'];
        this.usertype = result['usertype'];
      },

      error => {
        console.log(error);
      }
    );
  }
  saving = false;
  editable = false;
  newFullName;
  newUserName;
  newPassword;
  newGender;
  newAddress;
  newEmail;
  newContactNumber;
  editedData;

  edit() {
    this.showButtons = true;
    this.editable = true;
  }

  // onEdit(){

  // }

  onSubmit(data) {
    this.saving = true;
    let dataToSave = {
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName,
      username: data.username,
      password:
        data.displayPassword == '***************'
          ? 'P@ssw0rd'
          : data.displayPassword,
      usertype: data.usertype,
      gender: data.gender,
      email: data.email
    };
    console.log(dataToSave);
    let url = 'https://wbm-system.herokuapp.com/api/staff/update';
    this.apiService.updateData(url, data, this.staff.id).subscribe(
      result => {
        console.log(result);
        this.editable = false;
        this.saving = false;
        this.showButtons = false;
        this.loadInfoData(this.staffId);
      },
      error => {
        this.saving = false;
        console.log(error);
      }
    );
    // console.log(data);
    // console.log(this.staff.id);
  }
}
