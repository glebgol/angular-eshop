import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartProductEntry} from "../../../shared/models/cart-product-entry.model";
import {faSquareXmark} from "@fortawesome/free-solid-svg-icons";

@Component({
  templateUrl: 'cart-entry.component.html',
  styleUrl: 'cart-entry.component.scss',
  selector: '[appCartEntry]'
})
export class CartEntryComponent {
  @Input() cartEntry!: CartProductEntry;
  @Output() deleted = new EventEmitter<string>();
  removeIcon = faSquareXmark;

  removeCartEntry(id: string) {
    this.deleted.emit(id);
  }
}
