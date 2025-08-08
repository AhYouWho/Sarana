import {
  Component,
  AfterViewInit,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { BakongService } from 'src/app/service/bakong.service';
import { OrderService } from '../service/order.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { SharedService } from '../service/shared.service';
import { CartComponent } from '../cart/cart.component';
import { environment } from 'src/environments/environment';
declare const QRCode: any;
declare const bootstrap: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements AfterViewInit, OnInit, OnDestroy {
  myVar: string = 'Hello World';
  getUser: any = [];
  getOrder: any = [];
  qrdata: any = [];
  getOrderNumber: any;
  totalAmount: number = 0;
  orderNumber = '';
  countdown: string = '05:00';
  checkTransactionInterval: any;
  private duration: number = 300; // total seconds (2 minutes)
  private timerInterval: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private bakongService: BakongService,
    private orderService: OrderService,
    private router: Router,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
  individual: any;
  ngAfterViewInit() {
    setTimeout(() => {
      const user = localStorage.getItem('user');
      if (user) {
        this.getUser = JSON.parse(user);
      }
      this.orderService.getOrder(this.getUser.userid).subscribe((res) => {
        this.getOrder = res.order;
        this.getOrder = this.getOrder.filter(
          (ele: any) => ele.status === 'Pending'
        );
        this.totalAmount = 0;
        this.getOrder.forEach((item: any) => {
          const price = parseFloat(item.price);
          const qty = parseInt(item.qty, 10);
          this.totalAmount += price * qty;
          console.log('Number:', this.totalAmount);
        });

        this.orderNumber = this.getOrder[0].ordernumber;

        console.log('totalPrice', this.totalAmount);
        this.qrdata = {
          totalAmount: this.totalAmount,
          orderNumber: this.orderNumber,
        };
        console.log('QRData', this.qrdata);
        const result = this.bakongService.generateIndividual({
          receiverId: 'oeng_outeab@aclb',
          receiverName: 'OUTEAB OENG',
          receiverCity: 'PHNOM PENH',
          currency: 'usd',
          amount: this.totalAmount,
          mobileNumber: '85512233455',
          storeLabel: 'Coffee Shop',
          terminalLabel: 'Cashier_1',
          purposeOfTransaction: 'oversea',
          languagePreference: 'km',
          merchantNameAlt: 'ចន ស្មីន',
          merchantCityAlt: 'សៀមរាប',
          upiMerchantAccount: '0001034400010344ABCDEFGHJIKLMNO',
        });

        if (!result) {
          console.error('Failed to generate KHQR individual.');
          return;
        }

        this.individual = result;

        const checkoutButton = document.getElementById('checkout');
        if (checkoutButton) {
          checkoutButton.addEventListener('click', () => this.displayQRCode());
        }
      });

      const modalEl = document.getElementById('qrCodeModal');
      if (modalEl) {
        modalEl.addEventListener('shown.bs.modal', () => {
          const md5Value = this.individual?.data?.md5;
          console.log('Modal shown, starting scanner...');
          this.startQrCodeScanner(md5Value, this.orderNumber);
        });
      }
    });
  }
  displayQRCode() {
    this.startCountdown();
    if (!this.individual?.data?.qr) {
      console.error('QR code data is missing.');
      return;
    }

    const qrCodeCanvas = document.getElementById(
      'qrCodeCanvas'
    ) as HTMLCanvasElement;
    QRCode.toCanvas(qrCodeCanvas, this.individual.data.qr, (error: any) => {
      if (error) console.error('Error generating QR code:', error);
    });

    const modalEl = document.getElementById('qrCodeModal');
    if (modalEl) {
      const qrCodeModal = new bootstrap.Modal(modalEl);
      qrCodeModal.show();
    }
  }

  startQrCodeScanner = (md5Value: string, orderNumber: string): void => {
    if (!md5Value) {
      console.error('Md5 value is not available.');
      return;
    }
    console.log('MD5 sent:', md5Value);
    this.checkTransactionInterval = window.setInterval(() => {
      this.fetchTransactionStatus(md5Value, orderNumber);
    }, 5000);
  };

  // fetchTransactionStatus = async (
  //   md5: string,
  //   orderNumber: string
  // ): Promise<void> => {
  //   const token =
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMDAzYWYxYzUwMzljNDk5YSJ9LCJpYXQiOjE3NTM1OTgxNTUsImV4cCI6MTc2MTM3NDE1NX0.4x7U5TS9KHXbLSylTR4t9BzEpmppZkwCcFT1DJz3wnM'; // Replace securely
  //   const url = `${environment.bakongApiUrl}/v1/check_transaction_by_md5`;

  //   try {
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ md5 }),
  //     });

  //     const data = await response.json();
  //     if (!response.ok) {
  //       const errorData = await response.json().catch(() => ({}));
  //       console.error(`HTTP error! Status: ${response.status}`, errorData);
  //       clearInterval(this.checkTransactionInterval);
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     if (data.responseCode === 0 && data.responseMessage === 'Success') {
  //       console.log('Paid');
  //       clearInterval(this.checkTransactionInterval);

  //       const telegramBotToken = 'YOUR_TELEGRAM_BOT_TOKEN';
  //       const chatId = 'YOUR_CHAT_ID';
  //       const message = `Order #${orderNumber} has been successfully processed.`;

  //       // try {
  //       //   const telegramResponse = await fetch(
  //       //     `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
  //       //     {
  //       //       method: 'POST',
  //       //       headers: { 'Content-Type': 'application/json' },
  //       //       body: JSON.stringify({ chat_id: chatId, text: message }),
  //       //     }
  //       //   );

  //       //   const telegramData = await telegramResponse.json();
  //       //   console.log('Telegram notification sent:', telegramData);
  //       // } catch (telegramError) {
  //       //   console.error('Error sending Telegram notification:', telegramError);
  //       // }

  //       console.log('orderNumber', orderNumber);
  //       this.orderService.confirmpayment(orderNumber).subscribe((res) => {
  //         if (res.status === 'Succeed') {
  //           console.log('Done Updated');
  //           this.sharedService.updateValue(res.order);
  //           const modalEl = document.getElementById('qrCodeModal');
  //           if (modalEl) {
  //             const qrCodeModal = bootstrap.Modal.getInstance(modalEl);
  //             if (qrCodeModal) {
  //               qrCodeModal.hide();
  //             }

  //             // Remove modal backdrop if it’s still in the DOM
  //             const backdrop = document.querySelector('.modal-backdrop');
  //             if (backdrop) {
  //               backdrop.parentNode?.removeChild(backdrop);
  //             }

  //             // Remove 'modal-open' class from body
  //             document.body.classList.remove('modal-open');
  //             document.body.style.removeProperty('padding-right');
  //           }
  //           this.router.navigate(['/payment/success']);
  //         }
  //       });
  //     } else if (
  //       data.responseCode === 1 &&
  //       data.responseMessage === 'Transaction failed.'
  //     ) {
  //       console.log('Transaction failed as per API response.');
  //       clearInterval(this.checkTransactionInterval);
  //     } else if (
  //       data.responseCode === 1 &&
  //       data.responseMessage ===
  //         'Transaction could not be found. Please check and try again.'
  //     ) {
  //       console.log(
  //         'Transaction not found as per API response. Continuing to poll.'
  //       );
  //     } else {
  //       console.log('Transaction status unknown or unexpected response:', data);
  //     }
  //   } catch (error) {
  //     console.error('Error checking transaction status:', error);
  //     clearInterval(this.checkTransactionInterval);
  //   }
  // };
  async fetchTransactionStatus(
    md5: string,
    orderNumber: string
  ): Promise<void> {
    try {
      this.bakongService.checkTransaction(md5).subscribe({
        next: (data: any) => {
          if (data.responseCode === 0 && data.responseMessage === 'Success') {
            console.log('Paid');
            console.log('Paid');
            clearInterval(this.checkTransactionInterval);
            console.log('orderNumber', orderNumber);
            this.orderService.confirmpayment(orderNumber).subscribe((res) => {
              if (res.status === 'Succeed') {
                console.log('Done Updated');
                this.sharedService.updateValue(res.order);
                const modalEl = document.getElementById('qrCodeModal');
                if (modalEl) {
                  const qrCodeModal = bootstrap.Modal.getInstance(modalEl);
                  if (qrCodeModal) {
                    qrCodeModal.hide();
                  }

                  // Remove modal backdrop if it’s still in the DOM
                  const backdrop = document.querySelector('.modal-backdrop');
                  if (backdrop) {
                    backdrop.parentNode?.removeChild(backdrop);
                  }

                  // Remove 'modal-open' class from body
                  document.body.classList.remove('modal-open');
                  document.body.style.removeProperty('padding-right');
                }
                this.router.navigate(['/payment/success']);
              }
            });
          } else {
            // handle other cases
            console.log('Transaction status:', data);
          }
        },
        error: (error) => {
          console.error('Error checking transaction status:', error);
        },
      });
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }
  startCountdown() {
    this.timerInterval = setInterval(() => {
      const minutes = Math.floor(this.duration / 60);
      const seconds = this.duration % 60;

      const formattedMinutes =
        minutes < 10 ? '0' + minutes : minutes.toString();
      const formattedSeconds =
        seconds < 10 ? '0' + seconds : seconds.toString();

      this.countdown = `${formattedMinutes}:${formattedSeconds}`;
      this.cdr.detectChanges();

      if (this.duration === 0) {
        clearInterval(this.timerInterval);
        console.log('Time is up!');
      } else {
        this.duration--;
      }
    }, 1000);
  }
}
