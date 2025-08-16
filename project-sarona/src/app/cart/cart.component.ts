import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from '../service/message.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private dataStorage: DataStorageService,
    private router: Router,
    private productservice: ProductService,
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  getUser: any = [];
  getItemCart: any;
  getCartData: any;
  storeCartArry: any = [];
  productonly: any;
  totalAmount: number = 0;
  totalCart: number = 0;
  imageUrl: String = environment.imageUrl + '/Images/';
  orderForm = new FormGroup({
    addressline: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    zipcode: new FormControl(''),
  });
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.getUser = JSON.parse(user);
      this.cartService.getCart(this.getUser.userid).subscribe((res: any) => {
        if (res.status === 'Succeed' && Array.isArray(res.cart)) {
          this.getCartData = res.cart;
          console.log('getCartData', this.getCartData);

          this.totalAmount = 0;
          this.totalCart = this.getCartData.length;
          console.log('totalCart', this.totalCart);

          this.productonly = res.cart.map((item: any) => item.product[0]);
          console.log('Products Only:', this.productonly);
          this.getCartData.forEach((ele: any) => {
            console.log('Cart Item:', ele.product);
            this.getItemCart = ele.product;
            const price = parseFloat(this.getItemCart[0].price); // Convert to number if possible
            console.log('Price', price);
            const qty = parseInt(ele.qty, 10); // Convert to integer if possible
            console.log('qty', qty);
            if (!isNaN(price) && !isNaN(qty)) {
              this.totalAmount += price * qty;
              console.log(
                `Price: ${price}, Quantity: ${qty}, Subtotal: ${price * qty}`
              );
            } else {
              console.warn('Invalid data in cart item:', ele);
            }
          });

          console.log('Total Amount:', this.totalAmount);
        } else {
          console.warn('Failed to fetch cart data or cart is not an array');
        }
      });
    } else {
      console.warn('No user found in localStorage');
    }
  }

  // Adding a new item to the cart
  flattenCartData(cartData: any): any[] {
    if (Array.isArray(cartData) && Array.isArray(cartData[0])) {
      return cartData.flat();
    }
    return cartData;
  }
  removeCart(cartId: any) {
    this.cartService.removeCart(cartId).subscribe((res) => {
      if (res.status === 'Succeed') {
        this.getCartData = this.getCartData.filter(
          (item: any) => item.cartID !== cartId
        );
        this.totalAmount = 0;
        this.getCartData.forEach((item: any) => {
          const price = parseFloat(item.product[0].price);
          const qty = parseInt(item.qty, 10);
          if (!isNaN(price) && !isNaN(qty)) {
            this.totalAmount += price * qty;
          }
        });
        this.totalCart = this.getCartData.length;

        this.messageService.doMessage(res.status, res.message, 'Cart!');
      } else {
        this.messageService.doMessage(res.status, res.message, 'Cart!');
      }
    });
  }

  addQty(data: any) {
    let cartEdit: {
      cartid: any;
      proid: any;
      userid: any;
      qty: any;
    } = {
      cartid: data.cartID,
      proid: data.product[0].proid,
      userid: this.getUser.userid,
      qty: data.qty + 1,
    };
    this.cartService.editCart(cartEdit).subscribe((res) => {
      if (res.status === 'Succeed') {
        window.location.reload();
      }
    });
  }
  minusQty(data: any) {
    let cartEdit: {
      cartid: any;
      proid: any;
      userid: any;
      qty: any;
    } = {
      cartid: data.cartID,
      proid: data.product[0].proid,
      userid: this.getUser.userid,
      qty: data.qty - 1,
    };
    this.cartService.editCart(cartEdit).subscribe((res) => {
      if (res.status === 'Succeed') {
        window.location.reload();
      }
    });
  }
  orderClick() {
    let data = {
      orderid: 0,
      userid: this.getUser.userid,
      status: 'Pending',
      addressline: this.orderForm.value.addressline,
      city: this.orderForm.value.city,
      country: this.orderForm.value.country,
      zipcode: this.orderForm.value.zipcode,
    };
    console.log('data', data);
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.parentNode?.removeChild(backdrop);
    }
    this.cartService.orderItem(data).subscribe((res) => {
      if (res.status === 'Succeed' || res.status === 'Warning') {
        console.log('res', res.status);
        this.router.navigate(['/payment']);
      }
    });
  }
  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/Image_NotFound.jpg'; // fallback image
  }
}
