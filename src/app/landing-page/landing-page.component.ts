import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  transactionRecordsNumber;
  householdNumber;
  employeeNumber;

  constructor(
    private authenticationService: AuthenticationService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.authenticationService.authenticate('dashboard');
    this.loadChart();
    this.getTransactionRecordsNumber();
    this.getHouseholdNumber();
    this.getEmployeeNumber();
  }

  //Chart JS Loader
  loadChart() {
    var ctx = document.getElementById('myChart');
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',

      // The data for our dataset
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [2, 10, 5, 2, 20, 30, 45, 50, 12, 3, 6, 8]
          }
        ]
      },

      // Configuration options go here
      options: {}
    });
  }

  //Get TransactionRecords Number

  getTransactionRecordsNumber() {
    let resultData;
    let url =
      'https://wbm-system.herokuapp.com/api/transaction/paid-transaction';
    this.apiService.getData(url).subscribe(
      result => {
        resultData = result;
        this.transactionRecordsNumber = resultData.length;
      },
      error => {
        console.log(error);
      }
    );
  }
  getHouseholdNumber() {
    let resultData;
    let url = 'https://wbm-system.herokuapp.com/api/customer';
    this.apiService.getData(url).subscribe(
      result => {
        resultData = result;
        this.householdNumber = resultData.length;
      },
      error => {
        console.log(error);
      }
    );
  }

  getEmployeeNumber() {
    let resultData;
    let url = 'https://wbm-system.herokuapp.com/api/staff';
    this.apiService.getData(url).subscribe(
      result => {
        resultData = result;
        this.employeeNumber = resultData.length;
      },
      error => {
        console.log(error);
      }
    );
  }
}
