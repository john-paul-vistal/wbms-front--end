import { Component, OnInit } from '@angular/core';
import { transactionRecords } from '../app-models';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.authenticate('transaction-records');
  }
}
