import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductService} from "../product.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-delete-filter-badge',
  templateUrl: './delete-filter-badge.component.html',
  styleUrl: './delete-filter-badge.component.scss'
})
export class DeleteFilterBadgeComponent {
  @Input() badges!: Map<string, string>;
  @Output() onBadgeDelete = new EventEmitter<string>();

  deleteFilter(id: string) {
    this.onBadgeDelete.emit(id);
  }
}
