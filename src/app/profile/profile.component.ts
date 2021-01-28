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

    this.loadInfoData(this.householdID);
    this.loadPendingTransactionData(this.householdID);
    this.loadPaidTransactionData(this.householdID);
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
          this.printReceipt('reciept');
          this.saved = true;
          setTimeout(() => {
            this.saved = false;
            ($('#payment') as any).modal('hide');
          }, 800);
          this.saving = false;
          this.loadPendingTransactionData(this.householdID);
          this.loadPaidTransactionData(this.householdID);
          this.cancel();
        },
        error => {
          console.log(error);
        }
      );
  }

  focusFunction() {
    this.rendered_amount = undefined;
  }

  printReceipt(elem) {
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write(
      '<html><head><title>' + document.title + '</title>'
    );
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title + '</h1>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    // mywindow.document.close(); // necessary for IE >= 10
    // mywindow.focus(); // necessary for IE >= 10*/

    // mywindow.print();
    // mywindow.close();

    return true;
  }
}
