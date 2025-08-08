import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private api = environment.apiUrl;
  constructor(private http: HttpClient) {}

  addCart(data: any) {
    return this.http.post<any>(`${this.api}/add-cart`, data);
  }
  getCart(userId: any) {
    return this.http.get<any>(`${this.api}/get-cart-by-userid/` + userId);
  }
  editCart(data: any) {
    return this.http.post<any>(`${this.api}/edit-cart`, data, {
      headers,
    });
  }
  removeCart(cartId: any) {
    return this.http.post<any>(
      `${this.api}/remove-cart?cartId=` + cartId,

      {
        headers,
      }
    );
  }
  orderItem(data: any) {
    return this.http.post<any>(`${this.api}/add-order`, data, {
      headers,
    });
  }
}
