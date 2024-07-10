import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductDetailsComponent} from "./products/product-details/product-details.component";
import {CartComponent} from "./cart/cart.component";
import {EditProductComponent} from "./products/edit-product/edit-product.component";
import {ProductsPageComponent} from "./products/products-page/products-page.component";

const routes: Routes = [
  { path: 'products', component: ProductsPageComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/edit/:id',  component: EditProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
