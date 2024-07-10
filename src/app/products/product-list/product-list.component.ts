import {Component, Input} from '@angular/core';
import {ProductService} from "../product.service";
import {Product} from "../product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() products!: Product[];

  constructor(private productService: ProductService) {
  }

  onProductDelete(productId: string) {
    this.products = this.products.filter(product => product.id != productId);
    this.productService.deleteProduct(productId);
  }
}
