import { Component, OnInit } from '@angular/core';
import { transactionRecords } from '../app-models';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {


  transactionRecords: transactionRecords[]= [
    {houseNo: 1, customerName: "Juan Tamad", waterConsumption: 300, amount: 2300},
    {houseNo: 2, customerName: "Pedro Penduko", waterConsumption: 420, amount: 3200},
    {houseNo: 3, customerName: "Jin Mori", waterConsumption: 280, amount: 2000 }
  ]

  houseNo = 0;
  customerName = '';
  waterConsumption = 0;
  amount = 0;


  constructor() { }

  ngOnInit(): void {
  }

}
