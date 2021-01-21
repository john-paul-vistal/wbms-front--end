import { Component, OnInit } from '@angular/core';
import { createTransactions } from '../app-models';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  createTransactions: createTransactions[]= [
    {houseNo: 1, customerName: "Juan Tamad", waterConsumption: 300, amount: 2300},
    {houseNo: 2, customerName: "Pedro Penduko", waterConsumption: 420, amount: 3200},
    {houseNo: 3, customerName: "Jin Mori", waterConsumption: 280, amount: 2000 }
  ]

  houseNo = 0;
  customerName = '';
  waterConsumption = 0;
  amount = 0;


 
}



