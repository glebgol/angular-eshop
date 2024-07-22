import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideHttpClient} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {SharedModule} from "./shared/shared.module";
import {CartModule} from "./cart/cart.module";
import {AuthModule} from "./auth/auth.module";
import {ProductsModule} from "./products/products.module";


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CartModule,
    AuthModule,
    ProductsModule,
    SharedModule
  ],
  providers: [
    provideHttpClient(), provideAnimations(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
