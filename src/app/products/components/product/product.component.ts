import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from "../../../shared/models/product.model";
import {CartService} from "../../../shared/services/cart.service";
import {faDollar, faStar} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: Product;
  @Input() count!: number;

  @Output() deleted = new EventEmitter<string>();

  star = faStar;
  dollar = faDollar;

  constructor(protected cartService: CartService) {
  }

  updateProductCount(count: number) {
    this.count = count;
    this.cartService.updateCart(this.product, count);
  }

  delete() {
    this.deleted.emit(this.product.id);
  }
}
