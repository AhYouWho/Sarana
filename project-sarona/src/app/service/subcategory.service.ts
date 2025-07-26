import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  constructor(private http: HttpClient) {}
  getSubcategoryList() {
    return this.http.post<any>(
      'https://localhost:7276/api/get-subcategory',
      null
    );
  }
  getSubcategoryById(SubcategoryId: number) {
    return this.http.get<any>(
      'https://localhost:7276/api/get-subcategory-by-id/' + SubcategoryId
    );
  }
  addSubcategory(data: any) {
    return this.http.post<any>(
      'https://localhost:7276/api/add-subcategory',
      data
    );
  }
  editSubcategory(data: any) {
    return this.http.post<any>(
      'https://localhost:7276/api/edit-subcategory',
      data
    );
  }
  removeSubcategory(data: any) {
    return this.http.post<any>(
      'https://localhost:7276/api/remove-subcategory',
      data
    );
  }
}
