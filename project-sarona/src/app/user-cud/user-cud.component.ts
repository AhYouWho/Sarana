import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-cud',
  templateUrl: './user-cud.component.html',
  styleUrls: ['./user-cud.component.css'],
})
export class UserCudComponent implements OnInit, OnDestroy {
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  userForm = new FormGroup({
    userid: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    dob: new FormControl(''),
    phone: new FormControl(''),
    gender: new FormControl(''),
    usertype: new FormControl(''),
  });

  btnSave = false;
  btnEdit = false;
  btnRemove = false;
  userList: any;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: false,
      language: {
        searchPlaceholder: 'Search User',
      },
    };
    this.getUser();
  }

  getUser() {
    if (this.dtElement?.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.clear().destroy();
        this.loadUserData(); // load fresh data after destroy
      });
    } else {
      this.loadUserData();
    }
  }

  loadUserData() {
    this.userService.getUserList().subscribe((res) => {
      if (res.status === 'Succeed') {
        this.userList = res.user;
        this.cdr.detectChanges();
        this.dtTrigger.next(null);
      } else {
        console.error('Failed to load subcategories:', res);
      }
    });
  }

  UserRemove(userid: any) {
    this.userService.removeUser(userid).subscribe((res) => {
      if (res.status === 'Succeed') {
        this.getUser();
        document.getElementById('btnClose')?.click();
        window.location.reload();
      } else {
        console.error('Error removing subcategory');
      }
    });
  }
}
