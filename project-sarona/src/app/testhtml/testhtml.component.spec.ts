import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesthtmlComponent } from './testhtml.component';

describe('TesthtmlComponent', () => {
  let component: TesthtmlComponent;
  let fixture: ComponentFixture<TesthtmlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TesthtmlComponent]
    });
    fixture = TestBed.createComponent(TesthtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
