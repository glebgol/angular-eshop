import {Component, HostListener, ViewChild} from '@angular/core';
import {ProductService} from "../product.service";
import {Product} from "../product";
import {FiltersForm} from "../FiltersForm";
import {FiltersFormComponent} from "../filters-form/filters-form.component";
import {ReviewsService} from "../../reviews.service";
import {Review} from "../../review";
import {ActivatedRoute, Router} from "@angular/router";
import {BackService} from "../../back.service";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent {
  products!: Product[];
  amountOfProducts!: number;
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
    this.filterProductsOnQueryParamsChange();
  }

  getProducts(formData: FiltersForm) {
    this.isProductsFetched = false;
    this.productService.getProducts().subscribe(products => {
      this.filterProducts(products, formData);
      this.applyFilterBadges(formData);
    });
  }

  deleteFormParam(id: string) {
    this.router.navigate([], {
      queryParams: {
        [id]: null
      },
      queryParamsHandling: 'merge',
    });

    this.form.filtersForm.get(id)?.reset()
  }

  private filterProducts(products: Product[], formData: FiltersForm): void {
    this.isProductsFetched = false;

    const searchParam = this.activatedRoute.snapshot.queryParams['search'];

    //todo introduce mini private methods for filtering lambdas
    this.products = products
      .filter(product => !formData.inStock || product.stock > 0)
      .filter(p => formData.maxPriceInvalid || (!Number(formData.maxPrice) && Number(formData.maxPrice) != 0) ||
        ((!formData.maxPrice || p.price <= Number(formData.maxPrice))
        && (formData.maxPrice != 0 || p.price == 0)))
      .filter(p => formData.minPriceInvalid || !Number(formData.minPrice) || !formData.minPrice
        || p.price >= Number(formData.minPrice))
      .filter(p => formData.maxRatingInvalid || ((!formData.maxRating || p.rating.rate <= formData.maxRating)
        && (formData.maxRating != 0 || p.rating.rate == 0)))
      .filter(p => !formData.minRating || p.rating.rate >= formData.minRating)
      .filter(p => !searchParam || p.title.toLowerCase()
        .includes(searchParam.toLowerCase()))

    if (formData.hasReviews) {
      this.reviewsService.getAllReviews().subscribe((reviews: Review[]) => {
        this.products = this.products.filter(p => reviews.find(review => review.productId == p.id));
      }).add(() => this.setProductsAmount())
    } else {
      this.setProductsAmount();
    }
  }

  //todo delete
  private filterProductsOnQueryParamsChange() {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(this.form.getFormData())
      this.getProducts(this.form.getFormData());
    });
  }

  //todo delete
  private setProductsAmount(): void {
    this.isProductsFetched = true;
    this.amountOfProducts = this.products.length
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
