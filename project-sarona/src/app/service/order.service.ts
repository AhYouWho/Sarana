import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  getOrder(userid: any) {
    return this.http.get<any>(
      'https://localhost:7276/api/get-order-by-user/' + userid
    );
  }
  confirmpayment(orderNumber: any) {
    return this.http.post<any>(
      'https://localhost:7276/api/confirmpayment/' + orderNumber,
      {}
    );
  }
  getOrderAll() {
    return this.http.post<any>('https://localhost:7276/api/get-order', null);
  }
}
