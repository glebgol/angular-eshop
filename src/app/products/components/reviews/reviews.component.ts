import {Component, Input} from '@angular/core';
import {Review} from "../../../shared/models/review.model";
import {ReviewsService} from "../../services/reviews.service";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  @Input({required: true}) productId!: string;

  reviews!: Review[]
  isLoading: boolean = true;

  constructor(private reviewsService: ReviewsService) {
  }

  ngOnInit() {
    this.reviewsService.getReviews(this.productId).subscribe(reviews => {
      this.reviews = reviews;
      this.isLoading = false;
    });
  }
}
