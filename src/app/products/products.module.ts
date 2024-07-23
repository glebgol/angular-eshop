import {NgModule} from '@angular/core';
import {ProductsPageComponent} from "./pages/products-page/products-page.component";
import {ProductListComponent} from "./components/product-list/product-list.component";
import {ProductComponent} from "./components/product/product.component";
import {ProductDetailsComponent} from "./pages/product-details/product-details.component";
import {CartCounterComponent} from "./components/cart-counter/cart-counter.component";
import {ReviewComponent} from "./components/review/review.component";
import {ReviewsComponent} from "./components/reviews/reviews.component";
import {EditProductComponent} from "./pages/edit-product/edit-product.component";
import {FiltersFormComponent} from "./components/filters-form/filters-form.component";
import {FilterBadgesComponent} from "./components/filter-badges/filter-badges.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../shared/guards/auth.guard";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsPageComponent, title: 'Shop' },
  { path: 'products/:id', component: ProductDetailsComponent, title: 'Product Details' },
  { path: 'product/edit/:id',  component: EditProductComponent, canActivate: [AuthGuard], title: 'Edit product' },
];

@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductListComponent,
    ProductComponent,
    ProductDetailsComponent,
    CartCounterComponent,
    ReviewComponent,
    ReviewsComponent,
    EditProductComponent,
    FiltersFormComponent,
    FilterBadgesComponent,
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProductsPageComponent,
    ProductDetailsComponent,
    EditProductComponent,
  ]
})
export class ProductsModule { }
