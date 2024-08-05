import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StockValidatorDirective} from "./directives/stock-validator.directive";
import {StockAvailabilityStyleDirective} from "./directives/stock-availability-style.directive";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {FaIconComponent, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SearchInputComponent} from "./components/search-input/search-input.component";


@NgModule({
  declarations: [
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
    StockValidatorDirective,
    StockAvailabilityStyleDirective,
    PageNotFoundComponent,
    FaIconComponent,
    FormsModule,
    CommonModule,
    SearchInputComponent,
  ]
})
export class SharedModule { }
