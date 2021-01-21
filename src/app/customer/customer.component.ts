import { Component, OnInit } from '@angular/core';
import { Customers } from '../app-models';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers: Customers[] = [
    {houseNo: 1, customerName: "Juan Tamad", address: "Sta. Cruz, Calape, Bohol", status: "Paid"},
    {houseNo: 2, customerName: "Pedro Penduko", address: "Tinibgan, Calape, Bohol", status: "Unpaid"},
    {houseNo: 3, customerName: "Jin Mori", address: "Tultugan, Calape, Bohol", status: "Paid" }
  ]

  houseNo = 0;
  customerName = '';
  address = '';
  status = '';

  constructor() { }

  ngOnInit(): void {
  }

}
