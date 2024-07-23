import {Injectable} from '@angular/core';
import {Review} from "../models/review";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class ReviewsService {

  API_URL = 'http://localhost:8000/reviews'

  constructor(private http: HttpClient) { }

  getReviews(productId: string): Observable<Review[]> {
    const options = { params: new HttpParams().set('productId', productId) };
    return this.http.get<Review[]>(this.API_URL, options);
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.API_URL);
  }
}
