import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import {CartCounterComponent} from "./product/cart-counter/cart-counter.component";

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    CartCounterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductListComponent
  ]
})
export class ProductsModule { }
