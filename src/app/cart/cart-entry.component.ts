import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CartProductEntry} from "../CartProductEntry";

@Component({
  template: `
    <th>{{cartEntry.id}}</th>
    <td>{{cartEntry.title}}</td>
    <td>{{cartEntry.count}}</td>
    <td>{{cartEntry.price}}</td>
    <td>{{cartEntry.price * cartEntry.count}}</td>
    <td>
      <button (click)="removeCartEntry(cartEntry.id)">Delete</button>
    </td>
  `,
  selector: '[appCartEntry]'
})
export class CartEntryComponent {
  @Input() cartEntry!: CartProductEntry;
  @Output() deleted = new EventEmitter<string>();

  removeCartEntry(id: string) {
    this.deleted.emit(id);
  }
}
