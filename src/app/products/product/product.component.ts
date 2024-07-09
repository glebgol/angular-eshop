import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../product";
import {CartService} from "../../cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: Product;
  @Output() deleted = new EventEmitter<string>();

  count: number = 1;

  constructor(public cartService: CartService) {
  }

  updateProductQuantity(quantity: number) {
    console.log(quantity, this.product.id)
    this.cartService.updateCart(this.product, quantity);
  }

  addToCartAndSetCartProductCount() {
    this.cartService.getCartProductEntry(this.product.id).subscribe(cartEntry => {
      this.count = cartEntry.count;
    }, () => {
      this.count = 1;
      this.cartService.updateCart(this.product, this.count);
    })
  }

  delete() {
    this.deleted.emit(this.product.id);
  }
}
