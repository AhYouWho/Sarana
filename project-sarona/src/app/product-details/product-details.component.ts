import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { GetDataService } from 'src/app/service/get-data.service';
import { ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from '../service/message.service';
import { SubcategoryService } from '../service/subcategory.service';
interface Product {
  proid: number;
  proname: string;
  prodesc: string;
  price: number;
  qty: number;
  image: string;
  status: number;
  cateid: number;
  subcateid: number;
  prospecid: number;
  createdate: string;
  modifieddate: string;
  deleteddate: string | null;
}
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private getData: GetDataService,
    private dataStorage: DataStorageService,
    private router: Router,
    private cartService: CartService,
    private productService: ProductService,
    private messageService: MessageService,
    private subcategoryService: SubcategoryService
  ) {}

  imageUrl: string = 'https://localhost:7276/Images/';
  getParamValue: any;
  getProductDetails: any;
  storeCartData: any = [];
  inCart: boolean = false;
  getUser: any = [];
  cartCount: number = 0;
  getCartData: any = [];
  getCategorisData: any = [];
  getSubcategoryList: any = [];
  SubcategoryFilterd: any = [];
  recommendedProduct: Product[] = [];
  productUNFilered: Product[] = [];
  activeTab = 'overview';
  specifications: { key: string; value: any }[] = [];
  ngOnInit(): void {
    this.getCategorisData = this.getData.categoriesData;
    this.getParamValue = this.route.snapshot.paramMap.get('id');
    var getVal = this.dataStorage.getCartData();

    this.storeCartData = getVal ? getVal : [];
    this.subcategoryService.getSubcategoryList().subscribe((res: any) => {
      if (res.status === 'Succeed') {
        this.getSubcategoryList = res.subcategory;
      }
    });
    this.productService.getProduct().subscribe((res) => {
      if (res.status === 'Succeed') {
        this.getProductDetails = res.product;
        this.recommendedProduct = res.product;

        // Filter products based on the selected category ID
        this.getProductDetails = this.getProductDetails.filter(
          (ele: any) => ele.proid == this.getParamValue
        );
        this.recommendedProduct = this.getRandomProducts(
          this.recommendedProduct.filter(
            (ele: any) => ele.cateid == this.getProductDetails[0].cateid
          ),
          3
        );
        console.log('this.recommendedProduct', this.recommendedProduct);
      }
    });
    this.inCart = this.storeCartData.some(
      (ele: any) => (ele.proid = parseInt(this.getParamValue, 10))
    );
    this.getUser = localStorage.getItem('user');
    this.getUser = JSON.parse(this.getUser);

    // console.log('Cart', this.storeCartData);
    // this.storeCartData.filter((ele: any) => {
    //   if (ele.proid == this.getParamValue) {
    //     this.inCart = true;
    //     console.log('Cart', this.storeCartData);
    //   }
    // });
  }
  // Helper method to flatten the cart data

  addCart(data: any) {
    let userTestStatus: {
      cartID: number;
      proid: number;
      userid: number;
      qty: number;
    }[] = [
      {
        cartID: 0,
        proid: Number(this.getProductDetails[0].proid),
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
  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/Image_NotFound.jpg'; // fallback image
  }
  getSubcategory(cateid: any) {
    this.SubcategoryFilterd = this.getSubcategoryList.filter(
      (ele: any) => ele.cateid === cateid
    );
  }

  showproductspec(prospecid: any) {
    this.productService.getProductSpecById(prospecid).subscribe((res) => {
      if (res.status === 'Succeed') {
        const rawSpec = res.productspec[0];
        this.specifications = Object.entries(rawSpec)
          .filter(
            ([_, value]) => value !== null && value !== '' && _ !== 'prospecid'
          )
          .map(([key, value]) => ({
            key: key
              .replace(/_/g, ' ')
              .replace(/([a-z])([A-Z])/g, '$1 $2')
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            value,
          }));
        this.activeTab = 'specifications'; // Open the tab
      }
    });
  }
  ProductDetails(cateid: any, proid: any) {
    this.router.navigate([`/product-detail/${cateid}/${proid}`]).then(() => {
      window.location.reload();
    });
  }
  getRandomProducts(products: Product[], count: number): Product[] {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
