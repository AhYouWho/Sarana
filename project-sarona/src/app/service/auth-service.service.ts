import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

 isLoggedIn(): boolean {
  // this.getUser = localStorage.getItem('user');
  //   this.getUser = JSON.parse(this.getUser);
    return !!localStorage.getItem('usertoken'); // Or check using a more secure method
  }
}
