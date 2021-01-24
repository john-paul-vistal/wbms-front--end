import { Component, OnInit } from '@angular/core';
import { createTransactions } from '../app-models';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.authenticate('pending-transaction');
  }
}
