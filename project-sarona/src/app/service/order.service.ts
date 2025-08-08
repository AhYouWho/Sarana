import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private api = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getOrder(userid: any) {
    return this.http.get<any>(`${this.api}/get-order-by-user/` + userid);
  }
  confirmpayment(orderNumber: any) {
    return this.http.post<any>(`${this.api}/confirmpayment/` + orderNumber, {});
  }
  getOrderAll() {
    return this.http.post<any>(`${this.api}/get-order`, null);
  }
}
