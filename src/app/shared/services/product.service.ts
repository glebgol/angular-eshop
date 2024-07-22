import {Injectable} from '@angular/core';
import {Product} from "../models/product";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class ProductService {

  API_URL = 'http://localhost:8000/products/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(this.API_URL + productId);
  }

  deleteProduct(productId: string): void {
    this.http.delete(this.API_URL + productId).subscribe();
  }

  updateProduct(product: Product): void {
    this.http.put(this.API_URL + product.id, product).subscribe();
  }
}
