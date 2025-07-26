import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private userService: UserService, private router: Router) {}
  Logout() {
    this.userService.logout;
    localStorage.clear();
    this.router.navigate(['/login']);
    console.log('Logging Out');
  }
}
