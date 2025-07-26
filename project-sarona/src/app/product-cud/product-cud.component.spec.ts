import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCudComponent } from './product-cud.component';

describe('ProductCudComponent', () => {
  let component: ProductCudComponent;
  let fixture: ComponentFixture<ProductCudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCudComponent]
    });
    fixture = TestBed.createComponent(ProductCudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
