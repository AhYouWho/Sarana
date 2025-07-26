import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCudComponent } from './user-cud.component';

describe('UserCudComponent', () => {
  let component: UserCudComponent;
  let fixture: ComponentFixture<UserCudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserCudComponent]
    });
    fixture = TestBed.createComponent(UserCudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
