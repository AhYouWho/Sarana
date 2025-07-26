import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { PaymentComponent } from '../payment/payment.component';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  @ViewChild(PaymentComponent) paymentComponent!: PaymentComponent;
  getOrder: any = [];
  getUser: any = [];
  getProduct: any = [];
  productInvoice: any = [];
  totalAmount: number = 0;
  totalAmountRiel: number = 0;
  ordernumber: any;
  today: any;
  constructor(
    private sharedService: SharedService,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.getUser = JSON.parse(user);
    }

    this.today = new Date();
    setTimeout(() => {
      this.sharedService.currentValue$.subscribe((value) => {
        this.getOrder = value;
        console.log('GetOrderIn Invoice:', this.getOrder);
        this.totalAmount = 0;
        this.getOrder.forEach((item: any) => {
          this.productService.getProductById(item.proid).subscribe((res) => {
            if (res.status === 'Succeed') {
              this.getProduct.push(res.product);
            }
          });
          // Filter products based on the selected category ID

          const price = parseFloat(item.price);
          const qty = parseInt(item.qty, 10);
          this.totalAmount += price * qty;
          this.totalAmountRiel = this.totalAmount * 4100;
          console.log('Number:', this.totalAmount);
        });
        this.ordernumber = this.getOrder[0].ordernumber;

        console.log('Received value:', value);
      });
    });
  }
  getProductNameById(proid: number): string {
    console.log('getProductNameById is running');
    console.log('this.getProduct', this.getProduct);
    console.log('proid', proid);
    const product = this.getProduct[0].find((p: any) => p.proid == proid);
    console.log('product', product);
    return product ? product.proname : 'Unknown Product';
  }
}
