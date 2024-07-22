import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartProductEntry} from "../../../shared/models/cart-product-entry";
import {faSquareXmark} from "@fortawesome/free-solid-svg-icons";

@Component({
  template: `
    <th>{{cartEntry.id}}</th>
    <td>{{cartEntry.title}}</td>
    <td>{{cartEntry.count}}</td>
    <td>{{cartEntry.price}}</td>
    <td>{{cartEntry.price * cartEntry.count}}</td>
    <td>
      <button (click)="removeCartEntry(cartEntry.id)">
        <fa-icon [icon]="removeIcon"></fa-icon>
      </button>
    </td>
  `,
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
