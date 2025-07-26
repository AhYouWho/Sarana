import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor() {}

  // store data in localstorage
  storeCartData(data: any) {
    let cartData = JSON.stringify(data);
    localStorage.setItem('cart-data', cartData);
  }
  storeWishlistData(data: any) {
    let wishlistData = JSON.stringify(data);
    localStorage.setItem('wishlist-data', wishlistData);
  }

  // get data from localStorage
  getCartData() {
    let getData: any = localStorage.getItem('cart-data');
    return JSON.parse(getData);
  }

  getWishlistData() {
    let getData: any = localStorage.getItem('wishlist-data');
    return JSON.parse(getData);
  }
}
