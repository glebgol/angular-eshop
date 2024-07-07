import { Injectable } from '@angular/core';
import {Review} from "./review";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  getReviews(productId: string): Observable<Review[]> {
    const options = { params: new HttpParams().set('productId', productId) };
    return this.http.get<Review[]>('http://localhost:8000/reviews', options);
  }
}
