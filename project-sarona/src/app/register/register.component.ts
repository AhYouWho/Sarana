import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    gender: new FormControl(''),
    dob: new FormControl(''),
    phone: new FormControl(''),
    usertype: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  Register() {
    if (this.userForm.value.password != this.userForm.value.confirmPassword) {
      this.toastr.warning('The password isn`t the same', 'Register User!', {
        timeOut: 3000,
        progressBar: true,
      });
    } else {
      let data = {
        userid: 0,
        username: this.userForm.value.username,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        gender: this.userForm.value.gender,
        dob: this.userForm.value.dob,
        phone: this.userForm.value.phone,
        usertype: 'User',
      };
      console.log('User', data);

      this.userService.addUser(data).subscribe((res) => {
        if (res.status === 'Succeed') {
          this.toastr.success('Succeed', 'Register User!', {
            timeOut: 3000,
            progressBar: true,
          });
          this.router.navigate(['/login']);
        } else {
          this.toastr.error('Something went wrong!', 'Register User!', {
            timeOut: 3000,
            progressBar: true,
          });
          console.log('Error Log', res.message);
        }
      });
    }
  }
}
