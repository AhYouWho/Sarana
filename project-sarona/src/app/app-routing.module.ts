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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'product-detail/:name/:id',
    component: ProductDetailsComponent,
  },
  { path: 'product-page/:name', component: ProductPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'testing', component: TesthtmlComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'payment/success', component: PaymentSuccessComponent },
  { path: 'payment/success/invoice', component: InvoiceComponent },
  { path: 'product-cud', component: ProductCudComponent },
  { path: 'subcategory-cud', component: SubcategoryCudComponent },
  { path: 'user-cud', component: UserCudComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'order-cud', component: OrderCudComponent },
  { path: 'product-page/:name/:subcateid', component: ProductPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
