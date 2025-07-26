import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../service/order.service';
import { PaymentComponent } from '../payment/payment.component';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css'],
})
export class PaymentSuccessComponent implements OnInit, AfterViewInit {
  @ViewChild(PaymentComponent) paymentComponent!: PaymentComponent;
  getOrder: any = [];
  totalAmount: number = 0;
  ordernumber: any;
  today: any;
  constructor(
    private orderService: OrderService,
    private router: Router,
    private sharedService: SharedService
  ) {}
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    this.today = new Date();
    setTimeout(() => {
      this.sharedService.currentValue$.subscribe((value) => {
        this.getOrder = value;
        this.totalAmount = 0;
        this.getOrder.forEach((item: any) => {
          const price = parseFloat(item.price);
          const qty = parseInt(item.qty, 10);
          this.totalAmount += price * qty;
          console.log('Number:', this.totalAmount);
        });
        this.ordernumber = this.getOrder[0].ordernumber;

        console.log('Received value:', value);
      });
    });
  }
  goInvoice() {
    this.router.navigate(['payment/success/invoice']);
  }
  goHome() {
    this.router.navigate(['/']);
  }
}
