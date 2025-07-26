import { Component, Input, OnInit } from '@angular/core';
import { DataStorageService } from '../service/data-storage.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private dataStorage: DataStorageService,
    private userService: UserService,
    private router: Router,
    private cartService: CartService
  ) {}

  @Input() cartCount: number = 0;
  getUser: any = [];
  getCartData: any;
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.getUser = JSON.parse(user);
      this.cartService.getCart(this.getUser.userid).subscribe((res: any) => {
        if (res.status === 'Succeed' && Array.isArray(res.cart)) {
          this.getCartData = res.cart;
          this.cartCount = this.getCartData.length;
        }
      });
    } else {
      console.warn('No user found in localStorage');
    }
  }

  Logout() {
    this.userService.logout;
    localStorage.clear();
    this.router.navigate(['/login']);
    console.log('Logging Out');
  }
}
