import {Component, Input} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {Product} from "../../../shared/models/product.model";
import {CartProductEntry} from "../../../shared/models/cart-product-entry.model";
import {CartService} from "../../../shared/services/cart.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() products!: Product[];
  cartEntries: CartProductEntry[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {
    this.cartService.getCart().subscribe(cartEntries => {
      this.cartEntries = cartEntries;
    })
  }

  onProductDelete(productId: string) {
    this.products = this.products.filter(product => product.id != productId);
    this.productService.deleteProduct(productId);
  }

  getCount(productId: string): number {
    const count = this.cartEntries.find(cartEntry => cartEntry.id == productId)?.count;
    return count ? count : 0;
  }
}
