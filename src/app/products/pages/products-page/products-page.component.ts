import {Component, ViewChild} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../../shared/models/product.model";
import {FiltersFormComponent} from "../../components/filters-form/filters-form.component";
import {ReviewsService} from "../../services/reviews.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FILTERS} from "../../constants/filters.constants";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent {
  products!: Product[];
  isProductsFetched: boolean = false;
  filterBadges: Map<string, string> = new Map();

  @ViewChild(FiltersFormComponent)
  filtersForm!: FiltersFormComponent;

  filters = FILTERS;

  constructor(private productService: ProductService, private reviewsService: ReviewsService,
              private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngAfterViewInit() {
    this.activatedRoute.queryParams.subscribe(() => {
      this.isProductsFetched = false;

      this.productService.getProducts(this.getRequestParams()).subscribe(products => {
        this.products = products;
        this.applyFilterBadges();
        this.isProductsFetched = true;
      });
    })
  }

  private getRequestParams(): { params: HttpParams } {
    const requestParams =  { params: new HttpParams() };

    for (let control in this.filtersForm.form.controls) {
      if (this.isNotEmptyAndValidFormControl(control)) {
        this.addRequestParam(requestParams, this.filters.get(control)?.requestQueryParam,
          this.filtersForm.form.get(control)?.value);
      }
    }

    return requestParams;
  }

  private addRequestParam(requestParams: { params: HttpParams }, requestQueryParamName?: string, value?: any) {
    if (value == 'true') {
      requestParams.params = requestParams.params.set('' + requestQueryParamName, 0);
    } else {
      requestParams.params = requestParams.params.set('' + requestQueryParamName, value);
    }
  }

  private applyFilterBadges() {
    for (let control in this.filtersForm.form.controls) {
      if (this.isNotEmptyAndValidFormControl(control)) {
        this.filterBadges.set(control, this.getFilterBadgeName(control));
      } else {
        this.filterBadges.delete(control);
      }
    }
  }

  private isNotEmptyAndValidFormControl(control: string) {
    return (this.filtersForm.form.get(control)?.value || this.filtersForm.form.get(control)?.value === 0)
      && this.filtersForm.form.get(control)?.valid
  }

  private getFilterBadgeName(control: string) {
    const value = this.filtersForm.form.get(control)?.value;

    if (value == 'true') {
      return '' + this.filters.get(control)?.filterName;
    } else {
      return '' + this.filters.get(control)?.filterName + value;
    }
  }

  deleteFormParam(id: string) {
    this.router.navigate([], {
      queryParams: {
        [id]: null
      },
      queryParamsHandling: 'merge',
    });

    this.filtersForm.form.get(id)?.reset();
  }
}
