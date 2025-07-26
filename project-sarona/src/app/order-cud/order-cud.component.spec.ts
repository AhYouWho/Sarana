import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCudComponent } from './order-cud.component';

describe('OrderCudComponent', () => {
  let component: OrderCudComponent;
  let fixture: ComponentFixture<OrderCudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderCudComponent]
    });
    fixture = TestBed.createComponent(OrderCudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
