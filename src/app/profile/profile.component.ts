import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  customer;
  customerID;
  firstName;
  lastName;
  email;
  contactNumber;
  address;
  transactions;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const householdID: string = this.route.snapshot.queryParamMap.get(
      'householdID'
    );
    this.loadInfoData(householdID);
    this.loadTransactionData(householdID);
    this.loadHistory();
  }

  loadHistory() {
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          'Jan.',
          'Feb.',
          'Mar.',
          'Apr.',
          'May',
          'Jun.',
          'Jul',
          'Aug.',
          'Sep.',
          'Oct.',
          'Nov.',
          'Dec.'
        ],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3, 5, 3, 6, 4, 5, 7],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

  loadTransactionData(householdID) {
    let url =
      'https://wbm-system.herokuapp.com/api/transaction/show-transactions';
    this.apiService.getSpecificData(url, householdID).subscribe(
      result => {
        console.log(result);
        this.transactions = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  loadInfoData(householdID) {
    let url = 'https://wbm-system.herokuapp.com/api/customer/show';
    this.apiService.getSpecificData(url, householdID).subscribe(
      result => {
        console.log(result);
        this.customer = result;
        this.customerID = result['id'];
        this.firstName = result['firstName'];
        this.lastName = result['lastName'];
        this.email = result['email'];
        this.contactNumber = result['contactNumber'];
        this.address = result['address'];
      },
      error => {
        console.log(error);
      }
    );
  }
}
