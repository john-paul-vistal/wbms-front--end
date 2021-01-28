import { Component, OnInit } from '@angular/core';
import { createTransactions } from '../app-models';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {
  transactionData;
  noData = false;
  constructor(
    private authenticationService: AuthenticationService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.authenticationService.authenticate('pending-transactions');
    this.loadData();
  }

  pendingArray = [];
  loadData() {
    let resultData;
    let url =
      'https://wbm-system.herokuapp.com/api/transaction/pending-transaction';
    this.apiService.getData(url).subscribe(
      result => {
        resultData = result;

        for (const key in resultData) {
          this.pendingArray.push(resultData[key][0]);
        }

        console.log(this.pendingArray);

        this.transactionData = resultData;
        if (this.transactionData.length == 0) {
          this.noData = true;
        }
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
