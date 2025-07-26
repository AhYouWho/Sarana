import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryCudComponent } from './SubcategoryCudComponent';

describe('SubcategoryCudComponent', () => {
  let component: SubcategoryCudComponent;
  let fixture: ComponentFixture<SubcategoryCudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubcategoryCudComponent],
    });
    fixture = TestBed.createComponent(SubcategoryCudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
