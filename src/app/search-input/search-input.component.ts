import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  doSearch(searchText: string) {
    this.router.navigate(['products'], {
      queryParams: {
        search: searchText ? searchText : null
      },
      queryParamsHandling: 'merge',
    });
  }

  getSearchValue() {
    const value = this.route.snapshot.queryParams['search'];
    return value ? value: null;
  }
}
