import {NgModule} from '@angular/core';
import {CartComponent} from "./pages/cart/cart.component";
import {CartEntryComponent} from "./components/cart-entry/cart-entry.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {CartService} from "./services/cart.service";

const routes: Routes = [
  { path: '', component: CartComponent, title: 'Cart' },
];

@NgModule({
  declarations: [CartComponent, CartEntryComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [CartComponent],
  providers: [CartService]
})
export class CartModule { }
