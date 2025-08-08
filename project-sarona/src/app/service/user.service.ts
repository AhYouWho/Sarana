import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = environment.apiUrl;
  constructor(private http: HttpClient) {}
  register(data: any) {
    return this.http.post<any>(`${this.api}/User/register`, data);
  }
  getUser() {
    return this.http.get<any>(`${this.api}/User/user`);
  }
  login(data: any) {
    return this.http.post<any>(`${this.api}/User/login`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true,
    });
  }
  logout() {
    return this.http.post<any>(`${this.api}/User/logout`, '');
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
    return this.http.post<any>(`${this.api}/get-user`, null);
  }
  getUserById(UserId: number) {
    return this.http.get<any>(`${this.api}/get-user-by-id/` + UserId);
  }
  addUser(data: any) {
    return this.http.post<any>(`${this.api}/User/register`, data);
  }
  editUser(data: any) {
    return this.http.post<any>(`${this.api}/edit-user`, data);
  }
  removeUser(data: any) {
    return this.http.post<any>(`${this.api}/remove-user`, data);
  }
}
