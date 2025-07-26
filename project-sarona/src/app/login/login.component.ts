import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from '../service/message.service';
import { error } from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  userinfo: any;
  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {}
  Login() {
    this.userService.login(this.userForm.value).subscribe(
      (res) => {
        console.log('Login response:', res.status);

        if (res.status === 'Succeed') {
          this.userinfo = res.user;
          let userdata = JSON.stringify(this.userinfo);
          localStorage.setItem('user', userdata);
          if (this.userinfo.usertype == 'admin') {
            this.messageService.doMessage(res.status, res.message, 'Login!');
            this.router.navigate(['/product-cud']);
          } else {
            this.router.navigate(['/']);
            this.messageService.doMessage(res.status, res.message, 'Login!');
          }
        } else {
          console.log('Login response:', res);

          // login didnt work
          this.messageService.doMessage(res.status, res.message, 'Login!');
        }
      },
      (error) => {
        // Display actual HTTP 400/500 backend error
        const backendMessage =
          error?.error?.message || 'Unexpected server error';
        const backendStatus = error?.error?.status;
        this.messageService.doMessage(backendStatus, backendMessage, 'Login!');
      }
    );
  }
}
