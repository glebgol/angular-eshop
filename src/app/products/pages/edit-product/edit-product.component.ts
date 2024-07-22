import { Component } from '@angular/core';
import {CartService} from "../../../shared/services/cart.service";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";
import {Product} from "../../../shared/models/product";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
  id: string = '1';
  product!: Product;
  isSubmitted: boolean = false;
  isLoading: boolean = true;
  isFound: boolean = false;

  constructor(activateRoute: ActivatedRoute, private productService: ProductService) {
    this.id = activateRoute.snapshot.params["id"];
    this.productService.getProductById(this.id).subscribe((product => {
      this.product = product;
    }));
  }

  ngOnInit() {
    this.productService.getProductById(this.id).subscribe((product => {
      this.product = product;
      this.isLoading = false;
      this.isFound = true;
    }), () => {
      this.isFound = false;
      this.isLoading = false;
    });
  }

  onSubmit(form: NgForm) {
    this.isSubmitted = true;
    this.productService.updateProduct(this.product);
  }
}
