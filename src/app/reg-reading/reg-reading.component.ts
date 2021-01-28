import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { ApiService } from '../service/api/api.service';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-reg-reading',
  templateUrl: './reg-reading.component.html',
  styleUrls: ['./reg-reading.component.scss']
})
export class RegReadingComponent implements OnInit {
  emptyCustomerId = false;
  emptyMeterReading = false;
  emptyReadingDate = false;

  today;
  saving = false;
  saved = false;

  customerData = [];
  dropdownList = [];
  selectedItem = [];
  dropdownSettings: IDropdownSettings;

  constructor(
    public authenticationService: AuthenticationService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authenticationService.authenticate('register-reading');
    let date = new Date();
    this.today =
      date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate();

    let url = 'https://wbm-system.herokuapp.com/api/customer';
    let resultData;
    this.apiService.getData(url).subscribe(
      result => {
        resultData = result;
        for (const data of resultData) {
          this.customerData.push({
            item_id: data.id,
            item_text: data.id + ' - ' + data.firstName + ' ' + data.lastName
          });
        }
        this.dropdownList = this.customerData;
      },
      error => {
        console.log(error);
      }
    );

    console.log(this.dropdownList);

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      closeDropDownOnSelection: true,
      enableCheckAll: false,
      itemsShowLimit: 1,
      allowSearchFilter: true
    };
  }

  onSubmit(data) {
    if (this.checkForm(data) == true) {
      this.saving = true;
      let transactionData = {
        recordedBy: data.recordedBy,
        customer_id: data.customer_id[0].item_id,
        meterReading: data.meterReading,
        reading_date: data.reading_date
      };
      console.log(transactionData);
      let url = 'https://wbm-system.herokuapp.com/api/transaction/create';
      this.apiService.saveData(url, transactionData).subscribe(
        result => {
          this.saved = true;
          this.saving = false;
          setTimeout(() => {
            this.router.navigate(['/pending-transactions']);
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
    this.emptyCustomerId = false;
    this.emptyMeterReading = false;
    this.emptyReadingDate = false;
    console.log(data.customer_id);
    if (data.customer_id == null) {
      this.emptyCustomerId = true;
    }
    if (data.meterReading == '') {
      this.emptyMeterReading = true;
    }
    if (data.reading_date == '') {
      this.emptyReadingDate = true;
    }

    if (
      this.emptyCustomerId == false &&
      this.emptyMeterReading == false &&
      this.emptyReadingDate == false
    ) {
      return true;
    }
  }

  toggle() {
    $('#wrapper').toggleClass('toggled');
  }
}
