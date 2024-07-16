export interface FiltersForm {
  minPrice: number,
  maxPrice: number,
  minRating: number,
  maxRating: number,
  inStock: boolean,
  hasReviews: boolean,

  minPriceInvalid: boolean,
  maxPriceInvalid: boolean,
  minRatingInvalid: boolean,
  maxRatingInvalid: boolean,
  inStockInvalid: boolean,
  hasReviewsInvalid: boolean,
}
