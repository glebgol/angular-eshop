import {importProvidersFrom, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {HttpClientModule} from "@angular/common/http";
import { CartCounterComponent } from './products/product/cart-counter/cart-counter.component';
import {ProductListComponent} from "./products/product-list/product-list.component";
import {ProductComponent} from "./products/product/product.component";
import {ProductDetailsComponent} from "./products/product-details/product-details.component";
import { ReviewComponent } from './review/review.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { StockAvailabilityStyleDirective } from './products/product/stock-availability-style.directive';
import { CartComponent } from './cart/cart.component';
import { CartEntryComponent } from './cart-entry/cart-entry.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PriceInputDirective } from './products/price-input.directive';
import { ProductsPageComponent } from './products/products-page/products-page.component';
import { FiltersFormComponent } from './products/filters-form/filters-form.component';
import { DeleteFilterBadgeComponent } from './products/delete-filter-badge/delete-filter-badge.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsPageComponent,
    ProductListComponent,
    ProductComponent,
    ProductDetailsComponent,
    CartCounterComponent,
    ReviewComponent,
    ReviewsComponent,
    StockAvailabilityStyleDirective,
    CartComponent,
    CartEntryComponent,
    EditProductComponent,
    PriceInputDirective,
    FiltersFormComponent,
    DeleteFilterBadgeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
