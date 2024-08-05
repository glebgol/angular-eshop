import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FILTERS} from "../../constants/filters.constants";

@Component({
  selector: 'app-filters-form',
  templateUrl: './filters-form.component.html',
  styleUrl: './filters-form.component.scss'
})
export class FiltersFormComponent {
  form: FormGroup = this.createFiltersForm();

  constructor(private productService: ProductService, private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(() => {
      this.router.navigate([], {
        queryParams: this.getQueryParamsFromForm(),
        queryParamsHandling: 'merge',
      });
    });

    this.activatedRoute.queryParams.subscribe(changes => {
      this.form.setValue(this.getFormValueFromParams(changes));
    });
  }

  private createFiltersForm() {
    const params = this.activatedRoute.snapshot.queryParams;
    const priceValidators: ValidatorFn[] = [Validators.min(0)];
    const ratingValidators: ValidatorFn[] = [Validators.min(0), Validators.max(5)];

    return this.formBuilder.group({
      minPrice: [this.getNumberParam(params, 'minPrice'), priceValidators],
      maxPrice: [this.getNumberParam(params, 'maxPrice'), priceValidators],
      minRating: [this.getNumberParam(params, 'minRating'), ratingValidators],
      maxRating: [this.getNumberParam(params, 'maxRating'), ratingValidators],
      inStock: [this.getBooleanParam(params, 'inStock')],
      hasReviews: [this.getBooleanParam(params, 'hasReviews')],
    });
  }

  private getFormValueFromParams(params: Params) {
    const formValue: { [key: string]: any } = {};
    for (let key of FILTERS.keys()) {
      formValue[key] = params[key] ? params[key] : null;
    }
    return formValue;
  }

  private getQueryParamsFromForm() {
    let queryParams: { [key: string]: any} = {};

    for (let controlsKey in this.form.controls) {
      const control = this.form.get(controlsKey);
      if (typeof control?.value == 'boolean') {
        queryParams[controlsKey] = control?.value ? true : null;
      } else {
        queryParams[controlsKey] = control?.valid ? control.value : null;
      }
    }

    return queryParams;
  }

  resetForm() {
    this.form.reset();
  }

  private getNumberParam(params: Params, name: string): number | null {
    return params[name] ? Number([params[name]]) : null;
  }

  private getBooleanParam(params: Params, name: string): boolean {
    return params[name] == 'true';
  }

  public get minPrice() {
    return this.form.get('minPrice');
  }

  public get maxPrice() {
    return this.form.get('maxPrice');
  }

  public get minRating() {
    return this.form.get('minRating');
  }

  public get maxRating() {
    return this.form.get('maxRating');
  }
}
