import { Component, OnInit } from '@angular/core';
import { transactionRecords } from '../app-models';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  page = 1;
  noRecords;
  transactionRecords;
  constructor(
    private authenticationService: AuthenticationService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.authenticationService.authenticate('transaction-records');
    this.loadData();
  }

  loadData() {
    let url =
      'https://wbm-system.herokuapp.com/api/transaction/paid-transaction';
    this.apiService.getData(url).subscribe(
      result => {
        this.transactionRecords = result;
        if (this.transactionRecords.length == 0) {
          this.noRecords = true;
        }
      },
      error => {
        console.log('Error');
        console.log(error);
      }
    );
  }

  pageChange(page) {
    page = page;
  }

  toggle() {
    $('#wrapper').toggleClass('toggled');
  }
}
