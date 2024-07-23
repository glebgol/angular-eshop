import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-delete-filter-badge',
  templateUrl: './filter-badges.component.html',
  styleUrl: './filter-badges.component.scss'
})
export class FilterBadgesComponent {
  @Input() badges!: Map<string, string>;
  @Output() onBadgeDelete = new EventEmitter<string>();

  deleteFilter(id: string) {
    this.onBadgeDelete.emit(id);
  }
}
