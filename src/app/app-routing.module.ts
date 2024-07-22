import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductDetailsComponent} from "./products/product-details/product-details.component";
import {CartComponent} from "./cart/cart.component";
import {EditProductComponent} from "./products/edit-product/edit-product.component";
import {ProductsPageComponent} from "./products/products-page/products-page.component";
import {AuthPageComponent} from "./auth-page/auth-page.component";
import {AuthGuard} from "./auth.guard";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsPageComponent, title: 'Shop' },
  { path: 'products/:id', component: ProductDetailsComponent, title: 'Product Details' },
  { path: 'product/edit/:id',  component: EditProductComponent, canActivate: [AuthGuard], title: 'Edit product' },
  { path: 'cart', component: CartComponent, title: 'Cart' },
  { path: 'auth',  component: AuthPageComponent, title: 'Auth' },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent, title: 'Page Not Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
