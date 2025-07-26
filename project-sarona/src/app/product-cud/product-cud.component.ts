import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { SubcategoryService } from '../service/subcategory.service';
import { DataTableDirective } from 'angular-datatables';
import { ProductService } from '../service/product.service';
import { CategoryService } from '../service/category.service';
declare const $: any;
@Component({
  selector: 'app-product-cud',
  templateUrl: './product-cud.component.html',
  styleUrls: ['./product-cud.component.css'],
})
export class ProductCudComponent implements OnInit, OnDestroy, AfterViewInit {
  private dtInstance: any;
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  imageUrl: string = 'https://localhost:7276/Images/';
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  selectedFile: File | null = null;
  productForm = new FormGroup({
    proid: new FormControl(''),
    proname: new FormControl(''),
    prodesc: new FormControl(''),
    price: new FormControl(''),
    qty: new FormControl(''),
    image: new FormControl(''),
    status: new FormControl(''),
    cateid: new FormControl(''),
    subcateid: new FormControl(''),
    prospecid: new FormControl(''),
  });
  productspecForm = new FormGroup({
    prospecid: new FormControl(''),
    processor: new FormControl(''),
    memory: new FormControl(''),
    display: new FormControl(''),
    storage: new FormControl(''),
    wifi: new FormControl(''),
    videocard: new FormControl(''),
    battery: new FormControl(''),
    weight: new FormControl(''),
    height: new FormControl(''),
    width: new FormControl(''),
    depth: new FormControl(''),
    cablelength: new FormControl(''),
    connectivity: new FormControl(''),
    sysrequirement: new FormControl(''),
    chipset: new FormControl(''),
    onboardgraphics: new FormControl(''),
    audio: new FormControl(''),
    lan: new FormControl(''),
    wirelessconect: new FormControl(''),
    expansionslot: new FormControl(''),
    storageinterface: new FormControl(''),
    usb: new FormControl(''),
    internalio: new FormControl(''),
    backpanelconnector: new FormControl(''),
    iocontroller: new FormControl(''),
    bios: new FormControl(''),
    uniquefeature: new FormControl(''),
    os: new FormControl(''),
    dpi: new FormControl(''),
    refresh_rate: new FormControl(''),
    panel_type: new FormControl(''),
    resolution: new FormControl(''),
    brightness: new FormControl(''),
    warranty: new FormControl(''),
    barcode: new FormControl(''),
  });
  filterProductData: any = [];
  SubCategorySelected: any = [];
  CategorySelected: any = [];
  allSubcategories: any = [];
  btnSave = false;
  btnEdit = false;
  btnRemove = false;
  btnUpload = false;
  btnSpec = false;
  productList: any;
  categoryList: any;
  productspecList: any;
  subcategoryList: any;
  imagePreview: any;
  prospecid: any;
  constructor(
    private productService: ProductService,
    private catgoryService: CategoryService,
    private subcatgoryService: SubcategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.getProduct();
    this.loadCategoryData();
    this.loadSubcategoryData();
  }
  ngAfterViewInit(): void {
    // // inside ngAfterViewInit(), *after* DataTable init
    // const table = this.dtInstance;
    // $('#dtProducts tbody').on('click', 'td.details-control', (e: any) => {
    //   const tr = $(e.currentTarget).closest('tr');
    //   const row = table.row(tr);
    //   if (row.child.isShown()) {
    //     // hide if already open
    //     row.child.hide();
    //     tr.removeClass('shown');
    //   } else {
    //     // build HTML of non-null specs
    //     const record = row.data();
    //     const specs = record.prospec; // must be part of your data source
    //     let html = `<table class="table table-sm">
    //   <tbody>`;
    //     Object.entries(specs).forEach(([key, value]) => {
    //       if (value !== null && value !== undefined && value !== '') {
    //         html += `
    //       <tr>
    //         <th style="width:120px">${key}</th>
    //         <td>${value}</td>
    //       </tr>`;
    //       }
    //     });
    //     html += `
    //   </tbody>
    // </table>`;
    //     row.child(html).show();
    //     tr.addClass('shown');
    //   }
    // });
  }
  getProduct() {
    if ($.fn.DataTable.isDataTable('#dtSubcategory')) {
      const table = $('#dtSubcategory').DataTable();
      table.clear().destroy();
    }
    this.productService.getProduct().subscribe((res) => {
      if (res.status === 'Succeed') {
        this.productList = res.product;
        setTimeout(() => {
          this.dtoptions = {
            pagingType: 'full_numbers',
            searching: true,
            lengthChange: false,
            responsive: false,
            scrollX: true,
            language: {
              searchPlaceholder: 'Search Product',
            },
          };

          this.dtTrigger.next(null);
        }, 100);
        // if ($.fn.DataTable.isDataTable('#dtProducts')) {
        //   ($('#dtProducts') as any).DataTable().clear().destroy();
        // }

        // ($('#dtProducts') as any).DataTable({
        //   data: this.productList,
        //   columns: [
        //     {
        //       title: 'No',
        //       data: null,
        //       className: 'details-control text-orange',
        //       render: (_data: any, _type: any, _row: any, meta: any) =>
        //         meta.row + 1,
        //     },
        //     { title: 'Product ID', data: 'proid' },
        //     {
        //       title: 'Image',
        //       data: 'image',
        //       orderable: false,
        //       render: (data: string) => {
        //         return `<img src="${this.imageUrl + data}"
        //                  onerror="this.src='assets/images/Image_NotFound.jpg'"
        //                  width="50"/>`;
        //       },
        //     },
        //     { title: 'Product Name', data: 'proname' },
        //     { title: 'Product Desc', data: 'prodesc' },
        //     { title: 'Price', data: 'price' },
        //     { title: 'Quantity', data: 'qty' },
        //     {
        //       title: 'Category',
        //       data: 'cateid',
        //       createdCell: (td: HTMLTableCellElement, data: string) => {
        //         // show a loading hint
        //         td.innerHTML = '<span class="text-muted">…</span>';

        //         // after 500ms, replace with real name
        //         setTimeout(() => {
        //           const name = this.getCategoryNameById(data);
        //           td.innerHTML = `<span>${name}</span>`;
        //         }, 100);
        //       },
        //     },
        //     {
        //       title: 'Subcategory',
        //       data: 'subcateid',
        //       createdCell: (td: HTMLTableCellElement, data: string) => {
        //         // show a loading hint
        //         td.innerHTML = '<span class="text-muted">…</span>';

        //         // after 500ms, replace with real name
        //         setTimeout(() => {
        //           const name = this.getSubcategoryNameById(data);
        //           td.innerHTML = `<span>${name}</span>`;
        //         }, 100);
        //       },
        //     },
        //     {
        //       title: 'Is Active',
        //       data: 'status',
        //       render: (data: number) => {
        //         return data === 1
        //           ? `<span class="activest">Active</span>`
        //           : `<span class="inactivest">InActive</span>`;
        //       },
        //     },
        //     {
        //       title: '',
        //       data: null,
        //       orderable: false,
        //       render: (data: any) => {
        //         return `
        //     <div class="dropdown">
        //       <button class="btn btn-sm btn-secondary dropdown-toggle"
        //               type="button"
        //               data-bs-toggle="dropdown"
        //               aria-expanded="false">
        //         <i class="bi bi-three-dots-vertical"></i>
        //       </button>
        //       <ul class="dropdown-menu">
        //         <li>
        //           <a class="dropdown-item view-btn"
        //              href="javascript:;"
        //              data-id="${data.proid}"
        //              data-mode="1">
        //             <i class="bi bi-eye"></i> View
        //           </a>
        //         </li>
        //         <li>
        //           <a class="dropdown-item edit-btn"
        //              href="javascript:;"
        //              data-id="${data.proid}"
        //              data-mode="2">
        //             <i class="bi bi-pencil-square"></i> Edit
        //           </a>
        //         </li>
        //         <li>
        //           <a class="dropdown-item upload-btn"
        //              href="javascript:;"
        //              data-id="${data.proid}"
        //              data-mode="4">
        //             <i class="bi bi-upload"></i> Upload Image
        //           </a>
        //         </li>
        //         <li>
        //           <a class="dropdown-item remove-btn"
        //              href="javascript:;"
        //              data-id="${data.proid}"
        //              data-mode="3">
        //             <i class="bi bi-trash"></i> Remove
        //           </a>
        //         </li>
        //       </ul>
        //     </div>`;
        //       },
        //     },
        //   ],
        // });
        // $('#dtProducts tbody')
        //   .on('click', '.view-btn', (e: any) => {
        //     const id = +$(e.currentTarget).data('id');
        //     this.GetProductById(id, 1);
        //   })
        //   .on('click', '.edit-btn', (e: any) => {
        //     const id = +$(e.currentTarget).data('id');
        //     this.GetProductById(id, 2);
        //   })
        //   .on('click', '.upload-btn', (e: any) => {
        //     const id = +$(e.currentTarget).data('id');
        //     this.GetProductById(id, 4);
        //   })
        //   .on('click', '.remove-btn', (e: any) => {
        //     const id = +$(e.currentTarget).data('id');
        //     this.GetProductById(id, 3);
        //   });
      } else {
        console.error('Failed to load subcategories:', res);
      }
    });
  }

  loadCategoryData() {
    this.catgoryService.getCategoryList().subscribe((res) => {
      if (res.status === 'Succeed') {
        this.categoryList = res.category;

        // Destroy DataTable if it exists
        this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy(); // safe destroy from angular-datatables
          this.cdr.detectChanges(); // ensure view updates
          setTimeout(() => {
            this.dtTrigger.next(null);
          }, 1000); // reinitialize the DataTable
        });
      } else {
        console.error('Failed to load subcategories:', res);
      }
    });
  }
  loadSubcategoryData() {
    this.subcatgoryService.getSubcategoryList().subscribe((res) => {
      if (res.status === 'Succeed') {
        this.subcategoryList = res.subcategory;
        this.allSubcategories = res.subcategory;
        // Destroy DataTable if it exists
        this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy(); // safe destroy from angular-datatables
          this.cdr.detectChanges(); // ensure view updates
          setTimeout(() => {
            this.dtTrigger.next(null);
          }, 1000); // reinitialize the DataTable
        });
      } else {
        console.error('Failed to load subcategories:', res);
      }
    });
  }
  ProductSave() {
    const formData = new FormData();

    const proid = 0;
    formData.append('proid', proid.toString());

    const proname = this.productForm.get('proname')?.value ?? '';
    formData.append('proname', proname);

    // repeat for other fields
    const prodesc = this.productForm.get('prodesc')?.value ?? '';
    formData.append('prodesc', prodesc);

    const price = this.productForm.get('price')?.value ?? '';
    formData.append('price', price);

    const qty = this.productForm.get('qty')?.value ?? '';
    formData.append('qty', qty);

    const cateid = this.productForm.get('cateid')?.value ?? '';
    formData.append('cateid', cateid);

    const subcateid = this.productForm.get('subcateid')?.value ?? '';
    formData.append('subcateid', subcateid);

    const status = this.productForm.get('status')?.value ?? '';
    formData.append('status', status);

    formData.append('image', 'No Image');

    const prospecid = 0;
    formData.append('prospecid', prospecid.toString());
    (formData as any).forEach((value: any, key: string) => {
      console.log(`${key}:`, value);
    });

    this.productService.addProduct(formData).subscribe((res) => {
      if (res.status === 'Succeed') {
        this.getProduct();
        document.getElementById('btnClose')?.click();
        window.location.reload();
      } else {
        console.error('Error saving subcategory');
      }
    });
  }

  GetProductById(productId: any, cud: number) {
    this.productService.getProductById(productId).subscribe((res) => {
      if (res.status === 'Succeed') {
        const sub = res.product[0];
        this.productForm.patchValue({
          proid: sub.proid,
          proname: sub.proname,
          prodesc: sub.prodesc,
          price: sub.price,
          qty: sub.qty,
          image: sub.image,
          status: sub.status,
          cateid: sub.cateid,
          subcateid: sub.subcateid,
        });
        this.imagePreview = this.imageUrl + sub.image;
      }
    });

    this.CUDButtonVisible(
      cud === 1, // Save
      cud === 2, // Edit
      cud === 3, // Remove
      cud === 4, // Uplaod
      cud === 5
    );
  }

  CUDButtonVisible(
    save: boolean,
    edit: boolean,
    remove: boolean,
    upload: boolean,
    spec: boolean
  ) {
    this.btnSave = save;
    this.btnEdit = edit;
    this.btnRemove = remove;
    this.btnUpload = upload;
    this.btnSpec = spec;
  }

  AddNewSubcategory() {
    this.CUDButtonVisible(true, false, false, false, false);
  }

  ProductEdit() {
    const formData = new FormData();

    const proid = this.productForm.get('proid')?.value ?? '';
    formData.append('proid', proid);

    const proname = this.productForm.get('proname')?.value ?? '';
    formData.append('proname', proname);

    // repeat for other fields
    const prodesc = this.productForm.get('prodesc')?.value ?? '';
    formData.append('prodesc', prodesc);

    const price = this.productForm.get('price')?.value ?? '';
    formData.append('price', price);

    const qty = this.productForm.get('qty')?.value ?? '';
    formData.append('qty', qty);

    const cateid = this.productForm.get('cateid')?.value ?? '';
    formData.append('cateid', cateid);

    const subcateid = this.productForm.get('subcateid')?.value ?? '';
    formData.append('subcateid', subcateid);

    const status = this.productForm.get('status')?.value ?? '';
    formData.append('status', status);

    this.prospecid = this.productForm.get('prospecid')?.value ?? '';

    if (this.prospecid == '') {
      this.prospecid = 0;
    }
    formData.append('prospecid', this.prospecid);
    formData.append('image', 'No Image');
    console.log('Product Edit to send', formData);
    this.productService.editProduct(formData).subscribe((res) => {
      if (res.status === 'Succeed') {
        this.getProduct();
        document.getElementById('btnClose')?.click();
        window.location.reload();
      } else {
        console.error('Error editing subcategory');
      }
    });
  }

  ProductRemove() {
    if (this.productForm.value.prospecid == '') {
      this.productForm.value.prospecid = '0';
    }
    console.log(this.productForm.value);
    this.productService
      .removeProduct(this.productForm.value)
      .subscribe((res) => {
        if (res.status === 'Succeed') {
          this.getProduct();
          document.getElementById('btnClose')?.click();
          window.location.reload();
        } else {
          console.error('Error removing subcategory');
        }
      });
  }
  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/Image_NotFound.jpg'; // fallback image
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  UploadImage() {
    const formData = new FormData();
    const proid = this.productForm.get('proid')?.value ?? '';
    formData.append('ID_To_Upload', proid);
    if (this.selectedFile) {
      formData.append('File', this.selectedFile); // ✅ only if it's not null
    } else {
      console.error('No file selected');
    }
    this.productService.uploadImage(formData).subscribe((res) => {
      if (res.status === 'Succeed') {
        this.getProduct();
        document.getElementById('btnClose')?.click();
        window.location.reload();
      } else {
        console.error('Error editing subcategory');
      }
    });
  }
  AddSpecification() {
    let data = {
      proid: this.productForm.get('proid')?.value,
      prospecid: 0,
      processor: this.productspecForm.get('processor')?.value,
      memory: this.productspecForm.get('memory')?.value,
      display: this.productspecForm.get('display')?.value,
      storage: this.productspecForm.get('storage')?.value,
      wifi: this.productspecForm.get('wifi')?.value,
      videocard: this.productspecForm.get('videocard')?.value,
      battery: this.productspecForm.get('battery')?.value,
      weight: this.productspecForm.get('weight')?.value,
      height: this.productspecForm.get('height')?.value,
      width: this.productspecForm.get('width')?.value,
      depth: this.productspecForm.get('depth')?.value,
      cablelength: this.productspecForm.get('cablelength')?.value,
      connectivity: this.productspecForm.get('connectivity')?.value,
      sysrequirement: this.productspecForm.get('sysrequirement')?.value,
      chipset: this.productspecForm.get('chipset')?.value,
      onboardgraphics: this.productspecForm.get('onboardgraphics')?.value,
      audio: this.productspecForm.get('audio')?.value,
      lan: this.productspecForm.get('lan')?.value,
      wirelessconect: this.productspecForm.get('wirelessconect')?.value,
      expansionslot: this.productspecForm.get('expansionslot')?.value,
      storageinterface: this.productspecForm.get('storageinterface')?.value,
      usb: this.productspecForm.get('usb')?.value,
      internalio: this.productspecForm.get('internalio')?.value,
      backpanelconnector: this.productspecForm.get('backpanelconnector')?.value,
      iocontroller: this.productspecForm.get('iocontroller')?.value,
      bios: this.productspecForm.get('bios')?.value,
      uniquefeature: this.productspecForm.get('uniquefeature')?.value,
      os: this.productspecForm.get('os')?.value,
      dpi: this.productspecForm.get('dpi')?.value,
      refresh_rate: this.productspecForm.get('refresh_rate')?.value,
      panel_type: this.productspecForm.get('panel_type')?.value,
      resolution: this.productspecForm.get('resolution')?.value,
      brightness: this.productspecForm.get('brightness')?.value,
      warranty: this.productspecForm.get('warranty')?.value,
      barcode: this.productspecForm.get('barcode')?.value,
    };
    console.log('DATA', data);
    this.productService.addProductSpec(data).subscribe((res) => {
      if (res.status === 'Succeed') {
        document.getElementById('btnClose')?.click();
        window.location.reload();
      } else {
        console.error('Error saving subcategory');
      }
    });
  }
  filterSelect(data: any) {
    this.filterProductData = [];
    var getFilterValue: any = data.target.value;
    console.log(getFilterValue, 'getFilterValue');
    console.log(this.subcategoryList, 'subcategoryList');
    // Filter products based on the selected subcategory ID
    this.filterProductData = this.allSubcategories.filter(
      (ele: any) => ele.cateid == getFilterValue
    );
    this.subcategoryList = this.filterProductData;
    console.log('Filtered Products:', this.filterProductData);
  }
  getCategoryNameById(cateid: string): string {
    const category = this.categoryList?.find(
      (cat: any) => cat.cateid === cateid
    );
    return category ? category.catename : 'Unknown';
  }
  getSubcategoryNameById(subcateid: string): string {
    const subcategory = this.subcategoryList?.find(
      (cat: any) => cat.subcateid === subcateid
    );
    return subcategory ? subcategory.subcategory : 'Unknown';
  }

  showproductspec(index: any, proid: any) {
    console.log('productspecList', proid);
    this.productService.getProductSpecById(proid).subscribe((res) => {
      if (res.status === 'Succeed') {
        const table = $('#dtSubcategory').DataTable();
        const row = table.row(index);
        if (row.child.isShown()) {
          row.child.hide();
        } else {
          const spec = res.productspec;
          console.log('productspecListAll', spec[0]);
          row.child(this.formatSpecHtml(spec)).show();
        }
      }
    });
  }
  formatSpecHtml(spec: any): string {
    if (!spec) return '<div class="text-muted">No specifications found.</div>';
    console.log('format');
    const rows = Object.entries(spec[0])
      .filter(([_, value]) => value !== null && value !== '') // Ignore null or empty
      .map(([key, value]) => {
        // Format key: e.g., 'onboardgraphics' => 'Onboard Graphics'
        const label = key
          .replace(/_/g, ' ') // Replace underscores
          .replace(/([a-z])([A-Z])/g, '$1 $2') // Split camelCase
          .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize
        console.log('formated');
        return `
       
           <td style="padding: 0.5rem 1rem;
  white-space: nowrap;
  border: 1px solid #ccc;"><strong>${label}:</strong> ${value}</td>
         
    
     
      `;
      })
      .join('');

    return `
    <div style="width: 100%; overflow-x: auto;">
  <table style="width: max-content; min-width: 100%; white-space: nowrap;">
        <tbody>
        <tr> ${rows}</tr>
         
        </tbody>
      </table>
      </div>
  `;
  }
}
