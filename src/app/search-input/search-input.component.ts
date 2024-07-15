import { Component } from '@angular/core';
import {ProductService} from "../products/product.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent {
  search: {text: string} = { text: '' };

  constructor(private productService: ProductService, private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute, private router: Router) {
  }

  doSearch(myForm: any) {
    console.log(this.search)
    this.router.navigate(['products'], {
      queryParams: {
        search: this.search.text ? this.search.text : null
      },
      queryParamsHandling: 'merge',
    });
  }
}
