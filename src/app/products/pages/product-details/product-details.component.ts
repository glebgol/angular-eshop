import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../../cart/services/cart.service";
import {ProductService} from "../../services/product.service";
import {Product} from "../../../shared/models/product.model";
import {faDollar, faStar} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  id: string = '1';
  isLoading: boolean = true;
  isFound: boolean = false;
  product!: Product;
  count!: number;

  star = faStar;
  dollar = faDollar;

  constructor(private cartService: CartService, private activateRoute: ActivatedRoute,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];

    this.productService.getProductById(this.id).subscribe((product => {
      this.product = product;
      this.isLoading = false;
      this.isFound = true;
    }), () => {
      this.isLoading = false;
    });

    this.cartService.getCartProductEntry(this.id).subscribe(cartEntry => {
      this.count = cartEntry.count;
    }, () => {
      this.count = 0;
    });
  }

  updateProductCount(count: number) {
    this.count = count;
    this.cartService.updateCart(this.product, count);
  }
}
