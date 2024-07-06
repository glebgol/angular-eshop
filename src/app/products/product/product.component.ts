import {Component, Input} from '@angular/core';
import {Product} from "../product";
import {CartService} from "../../cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input({required: true}) product!: Product;
  isClicked: boolean = false;
  count: number = 0;

  constructor(private cartService: CartService) {
  }

  updateProductQuantity(quantity: number) {
    console.log(quantity, this.product.id)
    this.cartService.updateCart(this.product, quantity);
  }

  replaceAddToCartButtonWithCounter() {
    this.isClicked = true;
    this.cartService.getCartProductEntry(this.product.id).subscribe(cartEntry =>
      this.count = cartEntry.count
    );
  }
}
