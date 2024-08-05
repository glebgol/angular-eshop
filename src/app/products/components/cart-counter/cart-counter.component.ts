import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.component.html',
  styleUrl: './cart-counter.component.scss'
})
export class CartCounterComponent {
  @Input() count!: number;
  @Input() stock!: number;

  @Output() changedCount = new EventEmitter<number>();

  addToCart() {
    this.count = 1;
    this.changedCount.emit(this.count);
  }

  decrementCounter() {
    this.count--;
    this.changedCount.emit(this.count);
  }

  incrementCounter() {
    this.count++;
    this.changedCount.emit(this.count);
  }

  isDecrementDisabled() {
    return this.count == 0;
  }

  isOutOfStock() {
    return this.count >= this.stock;
  }

  isNotInStock() {
    return this.stock == 0;
  }
}
