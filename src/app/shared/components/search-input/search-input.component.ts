import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  searchIcon = faSearch;

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
