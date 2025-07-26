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
import { OrderService } from '../service/order.service';

@Component({
  selector: 'app-order-cud',
  templateUrl: './order-cud.component.html',
  styleUrls: ['./order-cud.component.css'],
})
export class OrderCudComponent implements OnInit, OnDestroy {
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  orderForm = new FormGroup({
    orderid: new FormControl(''),
    userid: new FormControl(''),
    proid: new FormControl(''),
    qty: new FormControl(''),
    total: new FormControl(''),
    ordernumber: new FormControl(''),
    price: new FormControl(''),
    addressline: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl(''),
    zipcode: new FormControl(''),
    status: new FormControl(''),
  });

  btnSave = false;
  btnEdit = false;
  btnRemove = false;
  orderList: any;

  constructor(
    private orderService: OrderService,
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
        searchPlaceholder: 'Search Order',
      },
    };
    this.getOrder();
  }
  getOrder() {
    if (this.dtElement?.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.clear().destroy();
        this.loadOrderData(); // load fresh data after destroy
      });
    } else {
      this.loadOrderData();
    }
  }

  loadOrderData() {
    this.orderService.getOrderAll().subscribe((res) => {
      if (res.status === 'Succeed') {
        this.orderList = res.order;
        this.cdr.detectChanges();
        this.dtTrigger.next(null);
      } else {
        console.error('Failed to load subcategories:', res);
      }
    });
  }
}
