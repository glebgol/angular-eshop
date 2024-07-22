import { Component } from '@angular/core';
import {ProductComponent} from "../../components/product/product.component";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../../shared/services/cart.service";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent extends ProductComponent {
  id: string = '1';
  isLoading: boolean = true;
  isFound: boolean = false;

  constructor(protected override cartService: CartService, private activateRoute: ActivatedRoute,
              private productService: ProductService) {
    super(cartService);
  }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params["id"];

    this.productService.getProductById(this.id).subscribe((product => {
      this.product = product;
      this.isLoading = false;
      this.isFound = true;
    }), () => {
      this.isLoading = false;
    });
  }
}
