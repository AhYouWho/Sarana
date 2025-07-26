import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { FooterComponent } from './footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { TesthtmlComponent } from './testhtml/testhtml.component';
import { PaymentComponent } from './payment/payment.component';
import { CommonModule } from '@angular/common';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductCudComponent } from './product-cud/product-cud.component';
import { SubcategoryCudComponent } from './subcategory-cud/subcategory-cud.component';
import { DataTablesModule } from 'angular-datatables';
import { UserCudComponent } from './user-cud/user-cud.component';
import { RegisterComponent } from './register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderCudComponent } from './order-cud/order-cud.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContactComponent,
    AboutComponent,
    WishlistComponent,
    CartComponent,
    HomeComponent,
    NavbarComponent,
    ProductPageComponent,
    ProductDetailsComponent,
    FooterComponent,
    TesthtmlComponent,
    PaymentComponent,
    PaymentSuccessComponent,
    InvoiceComponent,
    SidebarComponent,
    ProductCudComponent,
    ProductCudComponent,
    SubcategoryCudComponent,
    UserCudComponent,
    RegisterComponent,
    OrderCudComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
