import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  householdID: string;
  loadingInfoData = false;
  saving = false;
  saved = false;
  originalContents;

  customer;
  customerID;
  firstName;
  lastName;
  email;
  contactNumber;
  address;
  Authorized = false;

  noHistory = false;
  noPending = false;

  pendingTransaction;
  paidTransaction;

  // Transaction Information
  transactionID = undefined;
  customername = undefined;
  readingDate = undefined;
  dueDate = undefined;
  meterReading = undefined;
  totalAmount = undefined;
  rendered_amount = null;
  renderedAmount = undefined;
  teller = localStorage.getItem('User');
  id = localStorage.getItem('UserID');

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    this.householdID = this.route.snapshot.queryParamMap.get('householdID');

    const parent: string = this.route.snapshot.queryParamMap.get('parent');

    if (
      localStorage.getItem('UserType') == 'ADMIN' ||
      localStorage.getItem('UserType') == 'MANAGER'
    ) {
      this.Authorized = true;
    } else {
      this.Authorized = false;
    }
    this.chartdata(this.householdID);
    this.loadInfoData(this.householdID);
    this.loadPendingTransactionData(this.householdID);
    this.loadPaidTransactionData(this.householdID);
<<<<<<< HEAD
    this.originalContents = document.body.innerHTML;
  }

  dataYear = []
  chartdata(householdID){
    var resultData;
    let url = 'https://wbm-system.herokuapp.com/api/transaction/getdataMonthlyByCustomer';
    this.apiService.getSpecificData(url,householdID).subscribe(
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
=======
    this.loadHistory();
    this.originalContents = document.body.innerHTML;
>>>>>>> 5cb14711da1d5f23554b3a04f615c8da3b73c596
  }

  loadChart(data){
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
            label: 'Monthly Payment Statistics',
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
            ],
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
        scales: { yAxes: 
          [{ scaleLabel: 
            { display: true, 
              labelString: `Payment` 
            } }],
            xAxes: 
          [{ scaleLabel: 
            { display: true, 
              labelString: 'Month' 
            } }]  ,
          } ,

          legend:{
            display: false
          },
          title: {
            display: true,
            text: "Monthly Payment Statistics",
            fontSize: 18
          }
      }
    });
  }

  loadPendingTransactionData(householdID) {
    let url =
      'https://wbm-system.herokuapp.com/api/transaction/show-pending-transaction';
    this.apiService.getSpecificData(url, householdID).subscribe(
      result => {
        this.pendingTransaction = result;

        if (this.pendingTransaction.length == 0) {
          this.noPending = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  loadPaidTransactionData(householdID) {
    let url =
      'https://wbm-system.herokuapp.com/api/transaction/show-paid-transaction';
    this.apiService.getSpecificData(url, householdID).subscribe(
      result => {
        this.paidTransaction = result;

        if (this.paidTransaction.length == 0) {
          this.noHistory = true;
        }
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

  navigate() {
    const parent: string = this.route.snapshot.queryParamMap.get('parent');
    if (parent == '1') {
      this.router.navigate(['/pending-transactions']);
    } else if (parent == '2') {
      this.router.navigate(['/household-records']);
    }
  }

  payInfo(id) {
    let data;
    this.loadingInfoData = true;
    this.rendered_amount = 0.0;
    let url = 'https://wbm-system.herokuapp.com/api/transaction/show';
    this.apiService.getSpecificData(url, id).subscribe(
      result => {
        this.loadingInfoData = false;
        data = result[0];
        this.transactionID = data.id;
        this.customername =
          data.customer.firstName +
          ' ' +
          data.customer.middleName +
          ' ' +
          data.customer.lastName;
        this.readingDate = data.reading_date;
        this.dueDate = data.due_date;
        this.meterReading = data.meterReading;
        this.totalAmount = data.total_amount;
      },
      error => {
        console.log(error);
      }
    );
  }

  savePaymentData;
  rendered = false;
  onSubmit(data) {
    if (this.checkPayment(data) == true) {
      this.savePaymentData = data;
      this.rendered = true;
    }
  }

  cancel() {
    this.rendered = false;
    this.rendered_amount = 0.0;
    this.savePaymentData = {};
    this.transactionID = undefined;
    this.customername = undefined;
    this.readingDate = undefined;
    this.dueDate = undefined;
    this.meterReading = undefined;
    this.totalAmount = undefined;
    this.change = 0.0;
  }

  notEnough = false;
  change = 0.0;

  checkPayment(data) {
    this.notEnough = false;
    if (data.rendered_amount < this.totalAmount) {
      this.notEnough = true;
    }

    if (this.notEnough == false) {
      this.change = data.rendered_amount - this.totalAmount;
      this.renderedAmount = data.rendered_amount;
      return true;
    }
  }

  recordPayment() {
    this.saving = true;
    setTimeout(() => {}, 5000);
    let url = 'https://wbm-system.herokuapp.com/api/transaction/pay';
    this.apiService
      .updateData(url, this.savePaymentData, this.transactionID)
      .subscribe(
        result => {
          console.log(result);
          this.saved = true;
          setTimeout(() => {
            this.saved = false;
            ($('#payment') as any).modal('hide');
            this.printReceipt();
            this.saving = false;
            this.loadPendingTransactionData(this.householdID);
            this.loadPaidTransactionData(this.householdID);
            this.cancel();
          }, 800);
        },
        error => {
          console.log(error);
        }
      );
  }

  focusFunction() {
    this.rendered_amount = undefined;
  }

  printReceipt() {
    var printContents = document.getElementById('reciept').innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = this.originalContents;
    window.location.reload(true);
  }
}
