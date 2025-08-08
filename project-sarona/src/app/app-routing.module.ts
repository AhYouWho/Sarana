import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { TesthtmlComponent } from './testhtml/testhtml.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProductCudComponent } from './product-cud/product-cud.component';
import { SubcategoryCudComponent } from './subcategory-cud/subcategory-cud.component';
import { UserCudComponent } from './user-cud/user-cud.component';
import { RegisterComponent } from './register/register.component';
import { OrderCudComponent } from './order-cud/order-cud.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'product-detail/:name/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'product-page/:name',
    component: ProductPageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'testing', component: TesthtmlComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  {
    path: 'payment/success',
    component: PaymentSuccessComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payment/success/invoice',
    component: InvoiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'product-cud',
    component: ProductCudComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'subcategory-cud',
    component: SubcategoryCudComponent,
    canActivate: [AuthGuard],
  },
  { path: 'user-cud', component: UserCudComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'order-cud', component: OrderCudComponent, canActivate: [AuthGuard] },
  {
    path: 'product-page/:name/:subcateid',
    component: ProductPageComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
