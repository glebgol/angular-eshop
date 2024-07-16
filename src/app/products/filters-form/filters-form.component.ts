import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../product.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FiltersForm} from "../FiltersForm";

@Component({
  selector: 'app-filters-form',
  templateUrl: './filters-form.component.html',
  styleUrl: './filters-form.component.scss'
})
export class FiltersFormComponent {
  filtersForm!: FormGroup;
  @Output() formDataChanged = new EventEmitter<FiltersForm>();

  constructor(private productService: ProductService, private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute, private router: Router) {
    this.filtersForm = this.createFiltersForm();
  }

  ngOnInit() {
    this.filtersForm.valueChanges.subscribe((valueChanges) => {
      this.router.navigate([], {
        queryParams: {
          minPrice: this.filtersForm.get('minPrice')?.invalid ? null : valueChanges.minPrice,
          maxPrice: this.filtersForm.get('maxPrice')?.invalid ? null : valueChanges.maxPrice,
          minRating: valueChanges.minRating,
          maxRating: valueChanges.maxRating,
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
      minPrice: this.filtersForm.get('minPrice')?.value,
      maxPrice: this.filtersForm.get('maxPrice')?.value,
      minRating: this.filtersForm.get('minRating')?.value,
      maxRating: this.filtersForm.get('maxRating')?.value,
      inStock: !!this.filtersForm.get('inStock')?.value,
      hasReviews: !!this.filtersForm.get('hasReviews')?.value,

      minPriceInvalid: !!this.filtersForm.get('minPrice')?.invalid,
      maxPriceInvalid: !!this.filtersForm.get('maxPrice')?.invalid,
      minRatingInvalid: !!this.filtersForm.get('minRating')?.invalid,
      maxRatingInvalid: !!this.filtersForm.get('maxRating')?.invalid,
      inStockInvalid: !!this.filtersForm.get('inStock')?.invalid,
      hasReviewsInvalid: !!this.filtersForm.get('hasReviews')?.invalid,
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

    return this.formBuilder.group({
      minPrice: params["minPrice"] ? Number([params["minPrice"]]) : null,
      maxPrice: [params["maxPrice"] ? Number([params["maxPrice"]]) : null, [Validators.min(0)]],
      minRating: params["minRating"] ? Number([params["minRating"]]) : null,
      maxRating: params["maxRating"] ? Number([params["maxRating"]]) : null,
      inStock: [params["inStock"] == 'true'],
      hasReviews: [params["hasReviews"] == 'true'],
    });
  }
}
