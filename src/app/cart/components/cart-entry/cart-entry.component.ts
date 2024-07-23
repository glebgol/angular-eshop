import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartProductEntry} from "../../../shared/models/cart-product-entry";
import {faSquareXmark} from "@fortawesome/free-solid-svg-icons";

@Component({
  template: `
    <th class="cart-table__cell--id">{{ cartEntry.id }}</th>
    <td class="cart-table__cell--title">{{ cartEntry.title }}</td>
    <td class="cart-table__cell--count">{{ cartEntry.count }}</td>
    <td class="cart-table__cell--price">{{ cartEntry.price | currency }}</td>
    <td class="cart-table__cell--total">{{ cartEntry.price * cartEntry.count | currency }}</td>
    <td class="cart-table__cell--action">
      <button class="cart-table__remove-btn" (click)="removeCartEntry(cartEntry.id)">
        <fa-icon [icon]="removeIcon" class="cart-table__remove-icon"></fa-icon>
      </button>
    </td>
  `,
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
