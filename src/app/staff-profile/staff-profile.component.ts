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
  password="......";
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

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const staffId: string = this.route.snapshot.queryParamMap.get(
      'staffID'
    );
    this.loadInfoData(staffId);

  }

  loadInfoData(staffId) {
    let url = 'https://wbm-system.herokuapp.com/api/staff/show';
    console.log(staffId);
    this.apiService.getSpecificData(url, staffId).subscribe(
      result => {
        this.staff = result;
        console.log(result);
        
        this.fullName = (result['firstName'] +" "+ result['middleName'] +" "+  result['lastName']);
        this.username = result['username'];
        this.gender = result['gender'];
        this.email = result['email'];
        this.contactNumber = result['contactNumber'];
        this.address = result['address'];
        this.usertype = result['usertype'];
        this.contactNumber = result['contactNumber'];
      },
      error => {
        console.log(error);
      }      
    );
    console.log(this.staff);   

  }
  saving = false;
  editable = false;
  newFullName;
  edit(){
    this.editable = true;
    let data = $("#editProfile")
    console.log(data);  
    
  }

  

}
