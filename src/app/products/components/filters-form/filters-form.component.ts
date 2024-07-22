import {Component, EventEmitter, Output} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ProductService} from "../../../shared/services/product.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FiltersForm} from "../../filters-form";
import {CustomValidators} from "../../../shared/validators/CustomValidators";

@Component({
  selector: 'app-filters-form',
  templateUrl: './filters-form.component.html',
  styleUrl: './filters-form.component.scss'
})
export class FiltersFormComponent {
  filtersForm: FormGroup;
  @Output() formDataChanged = new EventEmitter<FiltersForm>();

  constructor(private productService: ProductService, private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute, private router: Router) {
    this.filtersForm = this.createFiltersForm();
  }

  ngOnInit() {
    this.filtersForm.valueChanges.subscribe((valueChanges) => {
      this.router.navigate([], {
        queryParams: {
          minPrice: this.getNumberParamFromForm(valueChanges, 'minPrice'),
          maxPrice: this.getNumberParamFromForm(valueChanges, 'maxPrice'),
          minRating: this.getNumberParamFromForm(valueChanges, 'minRating'),
          maxRating: this.getNumberParamFromForm(valueChanges, 'maxRating'),
          hasReviews: valueChanges.hasReviews ? valueChanges.hasReviews : null,
          inStock: valueChanges.inStock ? valueChanges.inStock : null,
        },
        queryParamsHandling: 'merge',
      });
      this.notifyFormDataChanged();
    })
  }

  notifyFormDataChanged() {
    this.formDataChanged.emit(this.getFormData());
  }

  resetForm() {
    this.filtersForm.reset();
  }

  getFormData(): FiltersForm {
    return {
      minPrice: this.getNumber(this.minPrice?.value),
      maxPrice: this.getNumber(this.filtersForm.get('maxPrice')?.value),
      minRating: this.getNumber(this.filtersForm.get('minRating')?.value),
      maxRating: this.getNumber(this.filtersForm.get('maxRating')?.value),
      inStock: !!this.filtersForm.get('inStock')?.value,
      hasReviews: !!this.filtersForm.get('hasReviews')?.value,

      minPriceInvalid: !!this.filtersForm.get('minPrice')?.invalid,
      maxPriceInvalid: !!this.filtersForm.get('maxPrice')?.invalid,
      minRatingInvalid: !!this.filtersForm.get('minRating')?.invalid,
      maxRatingInvalid: !!this.filtersForm.get('maxRating')?.invalid,
    }
  }

  private getNumber(value: any): number | null {
    if (value === '' || value === null) {
      return null;
    }

    return Number(value);
  }

  getNumberParamFromForm(valueChanges: any, name: string) {
    if (this.filtersForm.get(name)?.invalid) {
      return null;
    } else if (Number(valueChanges[name]) >= 0) {
      return valueChanges[name] === '' ? null : valueChanges[name]
    } else {
      return null;
    }
  }

  isFormEmpty(): boolean {
    const formData: FiltersForm = this.getFormData();
    return !formData.inStock && !formData.hasReviews && !formData.maxPrice && formData.maxPrice != 0 &&
      !formData.minPrice && formData.minPrice != 0 && !formData.maxRating && formData.maxRating != 0 &&
      !formData.minRating && formData.minRating != 0
  }

  private createFiltersForm() {
    const params = this.activatedRoute.snapshot.queryParams;
    const validators: ValidatorFn[] = [Validators.min(0)];

    return this.formBuilder.group({
      minPrice: [this.getNumberParam(params, 'minPrice'), validators],
      maxPrice: [this.getNumberParam(params, 'maxPrice'), validators],
      minRating: [this.getNumberParam(params, 'minRating'), validators],
      maxRating: [this.getNumberParam(params, 'maxRating'), validators],
      inStock: [this.getBooleanParam(params, 'inStock')],
      hasReviews: [this.getBooleanParam(params, 'hasReviews')],
    });
  }

  private getNumberParam(params: Params, name: string): number | null {
    return params[name] ? Number([params[name]]) : null;
  }

  private getBooleanParam(params: Params, name: string): boolean {
    return params[name] == 'true';
  }

  public get minPrice() {
    return this.filtersForm.get('minPrice');
  }

  public get maxPrice() {
    return this.filtersForm.get('maxPrice');
  }

  public get minRating() {
    return this.filtersForm.get('minRating');
  }

  public get maxRating() {
    return this.filtersForm.get('maxRating');
  }
}
