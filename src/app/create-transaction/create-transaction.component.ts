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
  search: any;
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

  Search() {
    console.log(this.search);
    var input, filter, table, tr, td, i, txtValue;
    input = this.search;
    filter = input.toLowerCase();
    table = document.getElementById('pendingTransaction');
    tr = table.getElementsByTagName('tr');
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  }

  toggle() {
    $('#wrapper').toggleClass('toggled');
  }
}
