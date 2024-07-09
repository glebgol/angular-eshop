import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartProductEntry} from "../CartProductEntry";

@Component({
  selector: 'app-cart-entry',
  templateUrl: './cart-entry.component.html',
  styleUrl: './cart-entry.component.scss'
})
export class CartEntryComponent {
  @Input({required: true}) cartEntry!: CartProductEntry;
  @Output() removed = new EventEmitter<string>();

  totalPrice!: number;

  ngOnInit() {
    this.totalPrice = this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    return this.cartEntry.price * this.cartEntry.count;
  }

  removeCartEntry() {
    this.removed.emit(this.cartEntry.id);
  }
}
