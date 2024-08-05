import {Component, EventEmitter, Input, Output} from '@angular/core';

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
