import { Component } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {CartProductEntry} from "../../../shared/models/cart-product-entry.model";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  animations: [
    trigger('floatingOut', [
      transition(':enter', [
        animate('0.6s ease-in', keyframes([
          style({
            opacity: 0,
            transform: 'translateX(-100%)',
            offset: 0
          }),
          style({
            opacity: 1,
            transform: 'translateX(0)',
            offset: 1.0
          })
        ]))
      ]),
      transition(':leave', [
        animate('0.6s ease-out', keyframes([
          style({
            opacity: 1,
            transform: 'translateX(0)',
            offset: 0
          }),
          style({
            opacity: 0,
            transform: 'translateX(-100%)',
            offset: 1.0
          })
        ]))
      ])
    ])
  ]
})
export class CartComponent {
  cartEntries: CartProductEntry[] = [];
  columns: string[] = ['Product ID', 'Product Name', 'Count', 'Price', 'Total Price'];

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
