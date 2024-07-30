import {Filter} from "../models/filter.model";

export const FILTERS = new Map<string, Filter>([
  ['minPrice', { queryParam: 'minPrice', requestQueryParam: 'price_gte', filterName: 'Min Price ' }],
  ['maxPrice', { queryParam: 'maxPrice', requestQueryParam: 'price_lte', filterName: 'Max Price ' }],
  ['minRating', { queryParam: 'minRating', requestQueryParam: 'rating.rate_gte', filterName: 'Min Rating ' }],
  ['maxRating', { queryParam: 'maxRating', requestQueryParam: 'rating.rate_lte', filterName: 'Max Rating ' }],
  ['inStock', { queryParam: 'inStock', requestQueryParam: 'stock_ne', filterName: 'In Stock' }],
  ['hasReviews', { queryParam: 'hasReviews', requestQueryParam: 'rating.count_ne', filterName: 'Has Reviews' }],
]);
