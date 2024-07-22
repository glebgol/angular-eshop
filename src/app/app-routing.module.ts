import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductDetailsComponent} from "./products/pages/product-details/product-details.component";
import {CartComponent} from "./cart/pages/cart/cart.component";
import {EditProductComponent} from "./products/pages/edit-product/edit-product.component";
import {ProductsPageComponent} from "./products/pages/products-page/products-page.component";
import {AuthPageComponent} from "./auth/pages/auth-page/auth-page.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {PageNotFoundComponent} from "./shared/components/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent, title: 'Page Not Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
