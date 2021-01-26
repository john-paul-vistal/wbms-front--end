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
  constructor(
    private authenticationService: AuthenticationService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.authenticationService.authenticate('pending-transactions');
    this.loadData();
  }

  loadData() {
    let resultData;
    let url = 'https://wbm-system.herokuapp.com/api/transaction';
    this.apiService.getData(url).subscribe(
      result => {
        resultData = result;
        this.transactionData = resultData;
        console.log(this.transactionData);
      },
      error => {
        console.log(error);
      }
    );
  }
}
