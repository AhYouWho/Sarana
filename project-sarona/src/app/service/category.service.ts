import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  getCategoryList() {
    return this.http.post<any>('https://localhost:7276/api/get-category', null);
  }
}
