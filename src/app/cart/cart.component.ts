import { Component } from '@angular/core';
import {CartService} from "../cart.service";
import {CartProductEntry} from "../CartProductEntry";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartEntries!: CartProductEntry[];

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.getCart().subscribe(cartEntries => this.cartEntries = cartEntries);
  }

  removeCartEntry(cartEntryId: string) {
    this.cartEntries = this.cartEntries.filter(product => product.id != cartEntryId);
    this.cartService.removeCartEntry(cartEntryId);
  }
}
