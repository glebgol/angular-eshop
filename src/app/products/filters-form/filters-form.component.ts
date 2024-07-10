import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FiltersForm} from "../FiltersForm";

@Component({
  selector: 'app-filters-form',
  templateUrl: './filters-form.component.html',
  styleUrl: './filters-form.component.scss'
})
export class FiltersFormComponent {
  filtersForm : FormGroup;
  @Output() changed = new EventEmitter<FiltersForm>();

  constructor(private productService: ProductService, private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute, private router: Router) {

    const params = this.activatedRoute.snapshot.queryParams;

    this.filtersForm = this.formBuilder.group({
      minPrice: [params["minPrice"]],
      maxPrice: [params["maxPrice"]],
      minRating: [params["minRating"]],
      maxRating: [params["maxRating"]],
      inStock: [params["inStock"] == 'true'],
      hasReviews: [params["hasReviews"] == 'true'],
    });
  }

  getFormData(): FiltersForm {
    return {
      minPrice: this.filtersForm.get('minPrice')?.value,
      maxPrice: this.filtersForm.get('maxPrice')?.value,
      minRating: this.filtersForm.get('minRating')?.value,
      maxRating: this.filtersForm.get('maxRating')?.value,
      inStock: !!this.filtersForm.get('inStock')?.value,
      hasReviews: !!this.filtersForm.get('hasReviews')?.value
    }
  }

  notify() {
    this.changed.emit(this.getFormData());
  }

  ngAfterViewInit() {
    this.notify();
  }

  ngOnInit() {
    this.filtersForm.get('minPrice')?.valueChanges.subscribe((minPrice) => {
      this.router.navigate([], {
        queryParams: {
          minPrice: minPrice
        },
        queryParamsHandling: 'merge',
      });
      this.notify();
    });

    this.filtersForm.get('maxPrice')?.valueChanges.subscribe((maxPrice) => {
      this.router.navigate([], {
        queryParams: {
          maxPrice: maxPrice
        },
        queryParamsHandling: 'merge',
      });
      this.notify();
    });

    this.filtersForm.get('minRating')?.valueChanges.subscribe((minRating) => {
      this.router.navigate([], {
        queryParams: {
          minRating: minRating
        },
        queryParamsHandling: 'merge',
      });
      this.notify();
    });

    this.filtersForm.get('maxRating')?.valueChanges.subscribe((maxRating) => {
      this.router.navigate([], {
        queryParams: {
          maxRating: maxRating
        },
        queryParamsHandling: 'merge',
      });
      this.notify();
    });

    this.filtersForm.get('inStock')?.valueChanges.subscribe((inStock) => {
      this.router.navigate([], {
        queryParams: {
          inStock: inStock ? inStock : null
        },
        queryParamsHandling: 'merge',
      });
      this.notify();
    });

    this.filtersForm.get('hasReviews')?.valueChanges.subscribe((hasReviews) => {
      this.router.navigate([], {
        queryParams: {
          hasReviews: hasReviews ? hasReviews : null
        },
        queryParamsHandling: 'merge',
      });
      this.notify();
    });
  }

  resetForm() {
    this.filtersForm.reset();
    this.router.navigate([])
  }
}
