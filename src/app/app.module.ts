import {importProvidersFrom, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CartService} from "./cart.service";
import { CartCounterComponent } from './products/product/cart-counter/cart-counter.component';
import {ProductListComponent} from "./products/product-list/product-list.component";
import {ProductComponent} from "./products/product/product.component";
import {ProductDetailsComponent} from "./products/product-details/product-details.component";
import {provideRouter, RouterModule, Routes} from "@angular/router";
import { ReviewComponent } from './review/review.component';
import { ReviewsComponent } from './reviews/reviews.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    ProductComponent,
    ProductDetailsComponent,
    CartCounterComponent,
    ReviewComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
    [provideRouter(routes)]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
