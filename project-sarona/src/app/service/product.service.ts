import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getProduct() {
    return this.http.post<any>(`${this.api}/get-product`, null);
  }
  getCategory() {
    return this.http.post<any>(`${this.api}/get-category`, null);
  }
  getSubCategory() {
    return this.http.post<any>(`${this.api}/get-subcategory`, null);
  }
  getProductSpec() {
    return this.http.post<any>(`${this.api}/get-productspec`, null);
  }
  addProduct(data: any) {
    return this.http.post<any>(`${this.api}/add-product`, data);
  }
  uploadImage(data: any) {
    return this.http.post<any>(`${this.api}/add-imag`, data);
  }
  getProductById(productId: any) {
    return this.http.get<any>(`${this.api}/get-product-by-id/` + productId);
  }
  getProductSpecById(productId: any) {
    return this.http.get<any>(`${this.api}/get-productspec-by-id/` + productId);
  }
  editProduct(data: any) {
    return this.http.post<any>(`${this.api}/edit-product`, data);
  }
  addProductSpec(data: any) {
    return this.http.post<any>(`${this.api}/add-productspec`, data);
  }
  removeProduct(data: any) {
    return this.http.post<any>(`${this.api}/remove-product`, data);
  }
}
