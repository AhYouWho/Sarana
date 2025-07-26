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
import { CategoryService } from '../service/category.service';
import { ToastrService } from 'ngx-toastr';
declare const $: any;
@Component({
  selector: 'app-subcategory-cud',
  templateUrl: './subcategory-cud.component.html',
  styleUrls: ['./subcategory-cud.component.css'],
})
export class SubcategoryCudComponent implements OnInit, OnDestroy {
  dtoptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  subcategoryForm = new FormGroup({
    subcateid: new FormControl(''),
    cateid: new FormControl(''),
    subcategory: new FormControl(''),
    status: new FormControl(''),
  });

  btnSave = false;
  btnEdit = false;
  btnRemove = false;
  subcategoryList: any;
  categoryList: any;
  constructor(
    private subcatgoryService: SubcategoryService,
    private catgoryService: CategoryService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.getSubcategoryNew();
    this.loadCategoryData();
  }

  // getSubcategory() {
  //   this.subcatgoryService.getSubcategoryList().subscribe((res) => {
  //     if (res.status === 'Succeed') {
  //       this.subcategoryList = res.subcategory;

  //       // Destroy DataTable if it exists
  //       this.dtElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
  //         dtInstance.destroy(); // safe destroy from angular-datatables
  //         this.cdr.detectChanges(); // ensure view updates

  //         this.dtTrigger.next(null);
  //       });
  //     } else {
  //       console.error('Failed to load subcategories:', res);
  //     }
  //   });
  // }
  getSubcategoryNew() {
    if ($.fn.DataTable.isDataTable('#dtSubcategory')) {
      const table = $('#dtSubcategory').DataTable();
      table.clear().destroy();
    }

    this.subcatgoryService.getSubcategoryList().subscribe((res: any) => {
      if (res.status === 'Succeed') {
        this.subcategoryList = res.subcategory;

        setTimeout(() => {
          this.dtoptions = {
            pagingType: 'full_numbers',
            searching: true,
            lengthChange: false,
            language: {
              searchPlaceholder: 'Search Subcategory',
            },
          };

          this.dtTrigger.next(null);
        }, 100);
      } else {
        alert('Something went wrong!');
      }
    });
  }

  loadCategoryData() {
    this.catgoryService.getCategoryList().subscribe((res) => {
      if (res.status === 'Succeed') {
        this.categoryList = res.category;
        // this.cdr.detectChanges();
        // this.dtTrigger.next(null);
      } else {
        console.error('Failed to load categories:', res);
      }
    });
  }

  SubcategorySave() {
    this.subcategoryForm.value.subcateid = '0';
    this.subcatgoryService
      .addSubcategory(this.subcategoryForm.value)
      .subscribe((res) => {
        if (res.status === 'Succeed') {
          this.getSubcategoryNew();
          document.getElementById('btnClose')?.click();
          this.toastr.success('Succeed', 'Subcategory Management!', {
            timeOut: 3000,
            progressBar: true,
          });
          window.location.reload();
        } else {
          this.toastr.error(
            'Something went wrong!',
            'Subcategory Management!',
            {
              timeOut: 3000,
              progressBar: true,
            }
          );
        }
      });
  }

  GetSubcategoryById(subcategoryId: any, cud: number) {
    this.subcatgoryService
      .getSubcategoryById(subcategoryId)
      .subscribe((res) => {
        if (res.status === 'Succeed') {
          const sub = res.subcategory[0];
          this.subcategoryForm = new FormGroup({
            subcateid: new FormControl(sub.subcateid),
            cateid: new FormControl(sub.cateid),
            subcategory: new FormControl(sub.subcategory),
            status: new FormControl(sub.status),
          });
        }
      });

    this.CUDButtonVisible(
      cud === 1, // Save
      cud === 2, // Edit
      cud === 3 // Remove
    );
  }

  CUDButtonVisible(save: boolean, edit: boolean, remove: boolean) {
    this.btnSave = save;
    this.btnEdit = edit;
    this.btnRemove = remove;
  }

  AddNewSubcategory() {
    this.CUDButtonVisible(true, false, false);
  }

  SubcategoryEdit() {
    this.subcatgoryService
      .editSubcategory(this.subcategoryForm.value)
      .subscribe((res) => {
        if (res.status === 'Succeed') {
          this.getSubcategoryNew();

          document.getElementById('btnClose')?.click();
          this.toastr.success('Succeed', 'Subcategory Management!', {
            timeOut: 3000,
            progressBar: true,
          });
          window.location.reload();
        } else {
          this.toastr.error(
            'Something went wrong!',
            'Subcategory Management!',
            {
              timeOut: 3000,
              progressBar: true,
            }
          );
          console.error('Error editing subcategory');
        }
      });
  }

  SubcategoryRemove() {
    this.subcatgoryService
      .removeSubcategory(this.subcategoryForm.value)
      .subscribe((res) => {
        if (res.status === 'Succeed') {
          this.getSubcategoryNew();
          document.getElementById('btnClose')?.click();
          window.location.reload();
        } else {
          console.error('Error removing subcategory');
        }
      });
  }
  getCategoryNameById(cateid: string): string {
    const category = this.categoryList?.find(
      (cat: any) => cat.cateid === cateid
    );
    return category ? category.catename : 'Unknown';
  }
}
