import {Component, HostListener, ViewChild} from '@angular/core';
import {ProductService} from "../../../shared/services/product.service";
import {Product} from "../../../shared/models/product";
import {FiltersForm} from "../../filters-form";
import {FiltersFormComponent} from "../../components/filters-form/filters-form.component";
import {ReviewsService} from "../../../shared/services/reviews.service";
import {Review} from "../../../shared/models/review";
import {ActivatedRoute, Router} from "@angular/router";
import {BackService} from "../../../shared/services/back.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent {
  products!: Product[];
  filterBadges: Map<string, string> = new Map();
  isProductsFetched: boolean = false;
  @ViewChild(FiltersFormComponent)
  form!: FiltersFormComponent;

  constructor(private productService: ProductService, private reviewsService: ReviewsService,
              private activatedRoute: ActivatedRoute, private router: Router,
              private back: BackService) {
    this.performHardReloadWhenBackButtonClicked();
  }

  ngAfterViewInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.getProducts(this.form.getFormData());
    });
  }

  getProducts(formData: FiltersForm) {
    this.isProductsFetched = false;
    this.productService.getProducts().subscribe(products => {
      this.filterProducts(products, formData);
      this.applyFilterBadges(formData);
    });
  }

  private filterProducts(products: Product[], formData: FiltersForm): void {
    this.isProductsFetched = false;

    const searchParam = this.activatedRoute.snapshot.queryParams['search'];

    this.products = products
      .filter(product => this.isInStock(formData, product))
      .filter(product => this.isWithinMaxPrice(formData, product))
      .filter(product => this.isWithinMinPrice(formData, product))
      .filter(product => this.isWithinMaxRating(formData, product))
      .filter(product => this.isWithinMinRating(formData, product))
      .filter(product => this.isMatchingSearchQuery(searchParam, product))

    if (formData.hasReviews) {
      this.filterProductsByReviews()
        .add(() => this.isProductsFetched = true);
    } else {
      this.isProductsFetched = true;
    }
  }

  private filterProductsByReviews(): Subscription {
    return this.reviewsService.getAllReviews().subscribe((reviews: Review[]) => {
      this.products = this.products.filter(product => this.hasReviews(reviews, product));
    });
  }

  private hasReviews(reviews: Review[], p: Product) {
    return reviews.find(review => review.productId == p.id);
  }

  private isMatchingSearchQuery(searchParam: string, p: Product) {
    return !searchParam || p.title.toLowerCase()
      .includes(searchParam.toLowerCase());
  }

  private isWithinMinRating(formData: FiltersForm, p: Product) {
    return formData.minRating == null || p.rating.rate >= formData.minRating;
  }

  private isWithinMaxRating(formData: FiltersForm, p: Product) {
    return formData.maxRating == null || p.rating.rate <= formData.maxRating;
  }

  private isWithinMinPrice(formData: FiltersForm, p: Product) {
    return formData.minPrice == null || p.price >= formData.minPrice;
  }

  private isWithinMaxPrice(formData: FiltersForm, p: Product) {
    return formData.maxPrice == null || p.price <= formData.maxPrice;
  }

  private isInStock(formData: FiltersForm, product: Product) {
    return !formData.inStock || product.stock > 0;
  }

  private applyFilterBadges(formData: FiltersForm): void {
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
    } else if (!formData.maxPriceInvalid && formData.maxPrice) {
      this.filterBadges.set('maxPrice', 'Max Price ' + formData.maxPrice)
    } else {
      this.filterBadges.delete('maxPrice')
    }

    if (formData.minPrice == 0) {
      this.filterBadges.set('minPrice', 'Min Price 0')
    } else if (!formData.minPriceInvalid && formData.minPrice) {
      this.filterBadges.set('minPrice', 'Min Price ' + formData.minPrice)
    } else {
      this.filterBadges.delete('minPrice')
    }

    if (formData.maxRating == 0) {
      this.filterBadges.set('maxRating', 'Max Rating 0')
    } else if (!formData.maxRatingInvalid && formData.maxRating) {
      this.filterBadges.set('maxRating', 'Max Rating ' + formData.maxRating)
    } else {
      this.filterBadges.delete('maxRating')
    }

    if (formData.minRating == 0) {
      this.filterBadges.set('minRating', 'Min Rating 0')
    } else if (!formData.minRatingInvalid && formData.minRating) {
      this.filterBadges.set('minRating', 'Min Rating ' + formData.minRating)
    } else {
      this.filterBadges.delete('minRating')
    }
  }

  deleteFormParam(id: string) {
    this.router.navigate([], {
      queryParams: {
        [id]: null
      },
      queryParamsHandling: 'merge',
    });

    this.form.filtersForm.get(id)?.reset();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    this.back.setParam(true);
  }

  private performHardReloadWhenBackButtonClicked() {
    this.back.sharedData.subscribe(result => {
      if (result) {
        window.location.reload();
        this.back.setParam(false);
      }
    });
  }
}
