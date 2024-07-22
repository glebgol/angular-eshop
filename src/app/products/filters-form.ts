export interface FiltersForm {
  minPrice: number | null,
  maxPrice: number | null,
  minRating: number | null,
  maxRating: number | null,
  inStock: boolean,
  hasReviews: boolean,

  minPriceInvalid: boolean,
  maxPriceInvalid: boolean,
  minRatingInvalid: boolean,
  maxRatingInvalid: boolean,
}
