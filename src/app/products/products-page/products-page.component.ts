import {Component, ElementRef, ViewChild} from '@angular/core';
import {ProductService} from "../product.service";
import {Product} from "../product";
import {FiltersForm} from "../FiltersForm";
import {FiltersFormComponent} from "../filters-form/filters-form.component";
import {ReviewsService} from "../../reviews.service";
import {Review} from "../../review";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent {
  products!: Product[];
  amountOfProducts!: number;
  filterBadges: Map<string, string> = new Map();

  @ViewChild(FiltersFormComponent)
  form!: FiltersFormComponent;

  constructor(private productService: ProductService, private reviewsService: ReviewsService,
              private activatedRoute: ActivatedRoute, private router: Router) {
  }

  getProducts(formData: FiltersForm) {
    this.productService.getProducts().subscribe(products => {
      this.products = products
      this.filterProducts(formData);
      this.applyFilterBadges(formData);
    });
  }

  private filterProducts(formData: FiltersForm) {
    if (formData.inStock) {
      this.products = this.products.filter(product => product.stock > 0);
    }
    if (formData.maxPrice == 0) {
      this.products = this.products.filter(p => p.price == 0);
    }
    if (formData.maxPrice) {
      this.products = this.products.filter(p => p.price <= formData.maxPrice);
    }
    if (formData.minPrice) {
      this.products = this.products.filter(p => p.price >= formData.minPrice);
    }
    if (formData.maxRating == 0) {
      this.products = this.products.filter(p => p.rating.rate == 0);
    }
    if (formData.maxRating) {
      this.products = this.products.filter(p => p.rating.rate <= formData.maxRating);
    }
    if (formData.minRating) {
      this.products = this.products.filter(p => p.rating.rate >= formData.minRating);
    }
    if (formData.hasReviews) {
      this.reviewsService.getAllReviews().subscribe((reviews: Review[]) => {
        this.products = this.products.filter(p => reviews.find(review => review.productId == p.id));
      })
    }

  }

  updateForm(id: string) {
    let queryParams = {
      [id]: null
    };

    this.router.navigate([], {
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });

    this.form.filtersForm.get(id)?.reset()
  }

  private applyFilterBadges(formData: FiltersForm) {
    if (formData.inStock) {
      this.filterBadges.set('inStock', 'In Stock')
    } else {
      this.filterBadges.delete('inStock')
    }

    if (formData.hasReviews) {
      this.filterBadges.set('hasReviews', 'With Reviews')
    } else {
      this.filterBadges.delete('hasReviews')
    }

    if (formData.maxPrice == 0) {
      this.filterBadges.set('maxPrice', 'Max Price 0')
    } else if (formData.maxPrice) {
      this.filterBadges.set('maxPrice', 'Max Price ' + formData.maxPrice)
    } else {
      this.filterBadges.delete('maxPrice')
    }

    if (formData.minPrice) {
      this.filterBadges.set('minPrice', 'Min Price ' + formData.minPrice)
    } else {
      this.filterBadges.delete('minPrice')
    }

    if (formData.maxRating == 0) {
      this.filterBadges.set('maxRating', 'Max Rating 0')
    } else if (formData.maxRating) {
      this.filterBadges.set('maxRating', 'Max Rating ' + formData.maxRating)
    } else {
      this.filterBadges.delete('maxRating')
    }

    if (formData.minRating) {
      this.filterBadges.set('minRating', 'Min Rating ' + formData.minRating)
    } else {
      this.filterBadges.delete('minRating')
    }
  }
}
