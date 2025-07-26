import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  addCart(data: any) {
    return this.http.post<any>('https://localhost:7276/api/add-cart', data);
  }
  getCart(userId: any) {
    return this.http.get<any>(
      'https://localhost:7276/api/get-cart-by-userid/' + userId
    );
  }
  editCart(data: any) {
    return this.http.post<any>('https://localhost:7276/api/edit-cart', data, {
      headers,
    });
  }
  removeCart(cartId: any) {
    return this.http.post<any>(
      'https://localhost:7276/api/remove-cart?cartId=' + cartId,

      {
        headers,
      }
    );
  }
  orderItem(data: any) {
    return this.http.post<any>('https://localhost:7276/api/add-order', data, {
      headers,
    });
  }
}
