import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartService} from "./services/cart.service";
import {ReviewsService} from "./services/reviews.service";
import {UserService} from "./services/user.service";
import {StockValidatorDirective} from "./directives/stock-validator.directive";
import {StockAvailabilityStyleDirective} from "./directives/stock-availability-style.directive";
import {HeaderComponent} from "./components/header/header.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {FaIconComponent, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SearchInputComponent} from "./components/search-input/search-input.component";
import {ProductService} from "./services/product.service";
import {RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from "./guards/auth.guard";


@NgModule({
  declarations: [
    HeaderComponent,
    StockValidatorDirective,
    StockAvailabilityStyleDirective,
    PageNotFoundComponent,
    SearchInputComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    HeaderComponent,
    StockValidatorDirective,
    StockAvailabilityStyleDirective,
    PageNotFoundComponent,
    FaIconComponent,
    FormsModule,
    CommonModule,
  ],
  providers: [
    CartService,
    ReviewsService,
    UserService,
    ProductService,
    AuthGuard,
  ]
})
export class SharedModule { }
