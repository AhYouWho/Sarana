import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getProduct() {
    return this.http.post<any>('https://localhost:7276/api/get-product', null);
  }
  getCategory() {
    return this.http.post<any>('https://localhost:7276/api/get-category', null);
  }
  getSubCategory() {
    return this.http.post<any>(
      'https://localhost:7276/api/get-subcategory',
      null
    );
  }
  getProductSpec() {
    return this.http.post<any>(
      'https://localhost:7276/api/get-productspec',
      null
    );
  }
  addProduct(data: any) {
    return this.http.post<any>('https://localhost:7276/api/add-product', data);
  }
  uploadImage(data: any) {
    return this.http.post<any>('https://localhost:7276/api/add-image', data);
  }
  getProductById(productId: any) {
    return this.http.get<any>(
      'https://localhost:7276/api/get-product-by-id/' + productId
    );
  }
  getProductSpecById(productId: any) {
    return this.http.get<any>(
      'https://localhost:7276/api/get-productspec-by-id/' + productId
    );
  }
  editProduct(data: any) {
    return this.http.post<any>('https://localhost:7276/api/edit-product', data);
  }
  addProductSpec(data: any) {
    return this.http.post<any>(
      'https://localhost:7276/api/add-productspec',
      data
    );
  }
  removeProduct(data: any) {
    return this.http.post<any>(
      'https://localhost:7276/api/remove-product',
      data
    );
  }
}
