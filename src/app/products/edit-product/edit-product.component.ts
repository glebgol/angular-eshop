import { Component } from '@angular/core';
import {CartService} from "../../cart.service";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../product.service";
import {Product} from "../product";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
  id: string = '1';
  product!: Product;

  constructor(activateRoute: ActivatedRoute, private productService: ProductService) {
    this.id = activateRoute.snapshot.params["id"];
    this.productService.getProductById(this.id).subscribe((product => {
      this.product = product;
    }));
  }

  ngOnInit() {
    this.productService.getProductById(this.id).subscribe((product => {
      this.product = product;
    }));
  }

  onSubmit(form: NgForm) {
    // Form submission logic
    // console.log(form.value);

    this.productService.updateProduct(this.product);
  }
}
