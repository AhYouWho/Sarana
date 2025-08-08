import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private api = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getCategoryList() {
    return this.http.post<any>(`${this.api}/get-category`, null);
  }
}
