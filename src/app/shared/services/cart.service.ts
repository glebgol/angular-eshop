import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CartProductEntry} from "../models/cart-product-entry.model";
import {Product} from "../models/product.model";
import {Observable} from "rxjs";

@Injectable()
export class CartService {

  constructor(private httpClient: HttpClient) { }

  API_URL = 'http://localhost:8000/cart/';

  updateCart(product: Product, quantity: number) {
    this.httpClient.get<CartProductEntry[]>(this.API_URL).subscribe(products => {
      if (this.productEntryExists(products, product.id)) {
        this.updateOrDeleteCartEntry(product.id, quantity);
      } else {
        this.createCartEntry(product, quantity)
      }
    });
  }

  getCart(): Observable<CartProductEntry[]> {
    return this.httpClient.get<CartProductEntry[]>(this.API_URL);
  }

  getCartProductEntry(productId: string): Observable<CartProductEntry> {
    return this.httpClient.get<CartProductEntry>(this.API_URL + productId);
  }

  removeCartEntry(cartEntryId: string) {
    this.httpClient.delete(this.API_URL + cartEntryId).subscribe();
  }

  private productEntryExists(products: CartProductEntry[], productId: string): boolean {
    return !!products.find(p => p.id == productId);
  }

  private updateOrDeleteCartEntry(productId: string, quantity: number) {
    if (quantity == 0) {
      this.deleteProductFromCart(productId);
    } else {
      this.updateCartEntry(productId, quantity);
    }
  }

  private updateCartEntry(productId: string, quantity: number) {
    this.httpClient.patch(this.API_URL + productId, {
      count: quantity
    }).subscribe();
  }

  private deleteProductFromCart(productId: string) {
    this.httpClient.delete(this.API_URL + productId).subscribe()
  }

  public createCartEntry(product: Product, quantity: number) {
    this.httpClient.post(this.API_URL, this.getNewCartEntry(product, quantity)).subscribe();
  }

  private getNewCartEntry(product: Product, quantity: number): CartProductEntry {
    return {
      id: product.id,
      title: product.title,
      count: quantity,
      price: product.price
    };
  }
}
