import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  register(data: any) {
    return this.http.post<any>(
      'https://localhost:7276/api/User/register',
      data
    );
  }
  getUser() {
    return this.http.get<any>('https://localhost:7276/api/User/user');
  }
  login(data: any) {
    return this.http.post<any>('https://localhost:7276/api/User/login', data);
  }
  logout() {
    return this.http.post<any>('https://localhost:7276/api/User/logout', '');
  }

  getUserInfo(): any {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken; // Contains user info
      } catch (error) {
        console.error('Invalid token', error);
        return null;
      }
    }
    return null;
  }
  getUserList() {
    return this.http.post<any>('https://localhost:7276/api/get-user', null);
  }
  getUserById(UserId: number) {
    return this.http.get<any>(
      'https://localhost:7276/api/get-user-by-id/' + UserId
    );
  }
  addUser(data: any) {
    return this.http.post<any>(
      'https://localhost:7276/api/User/register',
      data
    );
  }
  editUser(data: any) {
    return this.http.post<any>('https://localhost:7276/api/edit-user', data);
  }
  removeUser(data: any) {
    return this.http.post<any>('https://localhost:7276/api/remove-user', data);
  }
}
