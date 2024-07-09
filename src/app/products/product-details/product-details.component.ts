import { Component } from '@angular/core';
import {ProductComponent} from "../product/product.component";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../cart.service";
import {Product} from "../product";
import {ProductService} from "../product.service";
import {StockAvailabilityStyleDirective} from "../product/stock-availability-style.directive";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent extends ProductComponent {
  id: string = '1';

  constructor(cartService: CartService, activateRoute: ActivatedRoute, productService: ProductService) {
    super(cartService);

    this.id = activateRoute.snapshot.params["id"];

    productService.getProductById(this.id).subscribe((product => {
      this.product = product;
    }));
  }

}
