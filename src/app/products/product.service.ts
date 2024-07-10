import {Injectable} from '@angular/core';
import {Product} from "./product";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {FiltersForm} from "./FiltersForm";
import {ReviewsService} from "../reviews.service";
import {Review} from "../review";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8000/products');
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8000/products/${productId}`);
  }

  deleteProduct(productId: string): void {
    this.http.delete(`http://localhost:8000/products/${productId}`).subscribe();
  }

  updateProduct(product: Product): void {
    this.http.put('http://localhost:8000/products/' + product.id, product).subscribe();
  }

  private getProductIdsWithReview() {
    this.http.get<Review[]>('http://localhost:8000/reviews')
  }
}
