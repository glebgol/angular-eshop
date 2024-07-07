import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.component.html',
  styleUrl: './cart-counter.component.scss'
})
export class CartCounterComponent {
  @Input() count: number = 1;
  @Output() changedCount = new EventEmitter<number>();
  @Output() clicked = new EventEmitter<void>();
  isClicked: boolean = false;

  addToCartAndOpenCounter() {
    this.isClicked = true;
    this.clicked.emit();
  }

  decrementCounter() {
    this.count--;
    this.changedCount.emit(this.count)
  }

  incrementCounter() {
    this.count++;
    this.changedCount.emit(this.count)
  }

  isDisabled() {
    return this.count == 0;
  }
}
