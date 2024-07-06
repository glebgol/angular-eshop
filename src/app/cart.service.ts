import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CartProductEntry} from "./CartProductEntry";
import {Product} from "./products/product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  BASE_URL = 'http://localhost:8000/cart';

  updateCart(product: Product, quantity: number) {
    this.httpClient.get<CartProductEntry[]>(this.BASE_URL).subscribe(products => {
      if (this.productEntryExists(products, product.id)) {
        this.updateOrDeleteCartEntry(product.id, quantity);
      } else {
        this.createCartEntry(product, quantity)
      }
    });
  }

  getCartProductEntry(productId: string): Observable<CartProductEntry> {
    return this.httpClient.get<CartProductEntry>(this.BASE_URL + '/' + productId);
  }

  private productEntryExists(products: CartProductEntry[], productId: string): boolean {
    return !!products.find(p => p.id == productId);
  }

  private updateOrDeleteCartEntry(productId: string, quantity: number) {
    console.log(quantity)
    if (quantity == 0) {
      this.deleteProductFromCart(productId);
    } else {
      this.updateCartEntry(productId, quantity);
    }
  }

  private updateCartEntry(productId: string, quantity: number) {
    this.httpClient.patch(`http://localhost:8000/cart/${productId}`, {
      count: quantity
    }).subscribe();
  }

  private deleteProductFromCart(productId: string) {
    this.httpClient.delete(`http://localhost:8000/cart/${productId}`).subscribe()
  }

  private createCartEntry(product: Product, quantity: number) {
    this.httpClient.post('http://localhost:8000/cart', this.getNewCartEntry(product, quantity)).subscribe();
  }

  private getNewCartEntry(product: Product, quantity: number): CartProductEntry {
    return {
      id: product.id.toString(),
      title: product.title,
      count: quantity,
      price: product.price
    };
  }
}
