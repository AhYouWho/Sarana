import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  private api = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getSubcategoryList() {
    return this.http.post<any>(`${this.api}/get-subcategory`, null);
  }
  getSubcategoryById(SubcategoryId: number) {
    return this.http.get<any>(
      `${this.api}/get-subcategory-by-id/` + SubcategoryId
    );
  }
  addSubcategory(data: any) {
    return this.http.post<any>(`${this.api}/add-subcategory`, data);
  }
  editSubcategory(data: any) {
    return this.http.post<any>(`${this.api}/edit-subcategory`, data);
  }
  removeSubcategory(data: any) {
    return this.http.post<any>(`${this.api}/remove-subcategory`, data);
  }
}
