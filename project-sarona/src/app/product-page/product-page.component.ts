import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from 'src/app/service/get-data.service';
import { ProductService } from '../service/product.service';
import { CartService } from '../service/cart.service';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent implements OnInit {
  getParamValue: any;
  getProductData: any = [];
  getCategoryData: any = [];
  CategorySelected: any = [];
  SubCategorySelected: any = [];
  filterProductData: any = [];
  getSubCategoryOption: any = [];
  getCartData: any = [];
  cartCount: any;
  getUser: any;
  p: number = 1;
  searchText: string = '';

  imageUrl: string = 'https://localhost:7276/Images/';

  constructor(
    private route: ActivatedRoute,
    private getData: GetDataService,
    private productService: ProductService,
    private cartService: CartService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getParamValue = this.route.snapshot.paramMap.get('name');
    const subcateidParam = this.route.snapshot.paramMap.get('subcateid');
    this.SubCategorySelected = subcateidParam ? +subcateidParam : undefined;

    this.getUser = localStorage.getItem('user');
    this.getUser = JSON.parse(this.getUser);

    // Fetch categories first
    this.productService.getCategory().subscribe((res: any) => {
      if (res.status === 'Succeed') {
        this.getCategoryData = res.category;
        const selectedCategory = this.getCategoryData.find(
          (value: any) => value.catename === this.getParamValue
        );
        if (selectedCategory) {
          this.CategorySelected = selectedCategory.cateid;
        }
      }

      // Now, fetch products and subcategories (can run in parallel)
      this.productService.getProduct().subscribe((productRes) => {
        if (productRes.status === 'Succeed') {
          this.getProductData = productRes.product;

          // Fetch subcategories and then apply filters
          this.productService.getSubCategory().subscribe((subCategoryRes) => {
            if (subCategoryRes.status === 'Succeed') {
              this.getSubCategoryOption = subCategoryRes.subcategory.filter(
                (ele: any) => ele.cateid === this.CategorySelected
              );
            }

            // All data is now loaded. Apply the initial filters.
            this.applyFilters();
          });
        }
      });
    });
  }

  // filterSelect(data: any) {
  //   this.filterProductData = [];
  //   var getFilterValue: any = data.target.value;
  //   console.log(getFilterValue, 'getFilterValue');

  //   if (getFilterValue != 'all') {
  //     this.productService.getProduct().subscribe((res) => {
  //       if (res.status === 'Succeed') {
  //         this.getProductData = res.product;
  //         this.SubCategorySelected = parseInt(getFilterValue, 10);
  //         console.log('Selected SubCategory ID:', this.SubCategorySelected);
  //         // Filter products based on the selected subcategory ID
  //         this.filterProductData = this.getProductData.filter(
  //           (ele: any) => ele.subcateid === this.SubCategorySelected
  //         );

  //         console.log('Filtered Products:', this.filterProductData);
  //       }
  //     });
  //   } else {
  //     this.filterProductData = this.getProductData.filter(
  //       (ele: any) => ele.cateid === this.CategorySelected
  //     );
  //   }
  // }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/Image_NotFound.jpg'; // fallback image
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
  filterSelect(event: any) {
    const val = event.target.value;
    if (val === 'all') {
      this.SubCategorySelected = undefined;
    } else {
      this.SubCategorySelected = +val;
    }
    this.applyFilters();
  }

  applyFilters() {
    // start with the full list
    let list = this.getProductData;

    // 1. filter by category
    this.filterProductData = list.filter(
      (p: any) => p.cateid === this.CategorySelected
    );

    // 2. filter by subcategory if selected

    if (this.SubCategorySelected) {
      console.log('SubCategorySelected', this.SubCategorySelected);
      this.filterProductData = list.filter(
        (p: any) => p.subcateid == this.SubCategorySelected
      );
    }

    // 3. filter by search text (case-insensitive match on product name)
    if (this.searchText.trim()) {
      const term = this.searchText.toLowerCase();
      this.filterProductData = list.filter((p: any) =>
        p.proname.toLowerCase().includes(term)
      );
    }
    if (this.searchText === '') {
      this.filterProductData = list.filter(
        (p: any) => p.cateid === this.CategorySelected
      );
      if (this.SubCategorySelected) {
        console.log('SubCategorySelected in apply', this.SubCategorySelected);
        this.filterProductData = list.filter(
          (p: any) => p.subcateid == this.SubCategorySelected
        );
      }
    }
    console.log('After all filters:', this.filterProductData);
    this.p = 1;
  }
}
