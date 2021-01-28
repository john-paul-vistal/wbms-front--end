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
  ) { }

  ngOnInit(): void {
    this.authenticationService.authenticate('dashboard');
    this.chartdata();
    this.getTransactionRecordsNumber();
    this.getHouseholdNumber();
    this.getEmployeeNumber();
  }
  
  dataYear = []
  chartdata(){
    var resultData;
    let url = 'https://wbm-system.herokuapp.com/api/transaction/getdataMonthly';
    this.apiService.getData(url).subscribe(
      result => {
        resultData = result;
        this.loadChart(resultData);
        console.log(resultData)
        for (const key in resultData) {
          this.dataYear.push(key);
        }
            },
      error => {
        console.log(error);
      },
   
    );
  }



  //Chart JS Loader
  loadChart(data) {
    var ctx = document.getElementById('myChart');
    // <select> <option value='2021'>2021</option></select>
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
            label: 'Monthly Income',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [
              data["2021"]["01"], 
              data["2021"]["02"], 
              data["2021"]["03"], 
              data["2021"]["04"], 
              data["2021"]["05"], 
              data["2021"]["06"], 
              data["2021"]["07"], 
              data["2021"]["08"], 
              data["2021"]["09"], 
              data["2021"]["10"], 
              data["2021"]["11"], 
              data["2021"]["12"], 
            ]
          }
        ]
      },

      // Configuration options go here
      options: {
        scales: { yAxes: 
          [{ scaleLabel: 
            { display: true, 
              labelString: `income` 
            } }],
            xAxes: 
          [{ scaleLabel: 
            { display: true, 
              labelString: 'month' 
            } }]  ,
          } ,
        legend: {
          display: false,
          
        },
        title: {
          display: true,
          text: "Monthly Income",
          fontSize: 18
        }
      }
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

  toggle() {
    $('#wrapper').toggleClass('toggled');
  }
}
