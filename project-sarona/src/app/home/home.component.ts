import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../service/get-data.service';
import { SubcategoryService } from '../service/subcategory.service';
import { ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  bannerImgs = [
    {
      id: 1,
      img: '../../assets/images/banner/banner_8.png',
    },
    {
      id: 2,
      img: '../../assets/images/banner/banner_9.png',
    },
    {
      id: 3,
      img: '../../assets/images/banner/banner_10.png',
    },
  ];

  getCategorisData: any;
  getApplianceProductData: any = [];
  getFashionProductData: any = [];
  getSubcategoryList: any = [];
  SubcategoryFilterd: any = [];
  getProductList: any = [];
  getCartData: any = [];
  getUser: any;
  cartCount: any;
  imageUrl: string = 'https://localhost:7276/Images/';
  p: number = 1;

  constructor(
    private getData: GetDataService,
    private subcategoryService: SubcategoryService,
    private productService: ProductService,
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getCategorisData = this.getData.categoriesData;
    this.getUser = localStorage.getItem('user');
    this.getUser = JSON.parse(this.getUser);
    this.subcategoryService.getSubcategoryList().subscribe((res: any) => {
      if (res.status === 'Succeed') {
        this.getSubcategoryList = res.subcategory;
      }
    });
    this.getData.productData.filter((ele: any) => {
      if (ele.pdCategory == 'appliances') {
        this.getApplianceProductData.push(ele);
      }
      if (ele.pdCategory == 'fashion') {
        this.getFashionProductData.push(ele);
      }
    });
    this.productService.getProduct().subscribe((productRes) => {
      if (productRes.status === 'Succeed') {
        this.getProductList = productRes.product;
        console.log('this.getProductList', this.getProductList);
      }
    });
  }

  getSubcategory(cateid: any) {
    this.SubcategoryFilterd = this.getSubcategoryList.filter(
      (ele: any) => ele.cateid === cateid
    );
  }
  addCart(proid: any) {
    let userTestStatus: {
      cartID: number;
      proid: number;
      userid: number;
      qty: number;
    }[] = [
      {
        cartID: 0,
        proid: Number(proid),
        userid: Number(this.getUser.userid),
        qty: 1,
      },
    ];
    console.log(userTestStatus);
    this.cartService.addCart(userTestStatus[0]).subscribe((res) => {
      if (res.status === 'Succeed') {
        this.cartService.getCart(this.getUser.userid).subscribe((res: any) => {
          if (res.status === 'Succeed' && Array.isArray(res.cart)) {
            this.getCartData = res.cart;
            this.cartCount = this.getCartData.length;
          }
        });
        this.messageService.doMessage(res.status, res.message, 'Cart!');
        console.log('cartcount', this.cartCount);
      } else {
        this.messageService.doMessage(res.status, res.message, 'Cart!');
      }
    });
  }
}
