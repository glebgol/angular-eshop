import {Component, Input} from '@angular/core';
import {Review} from "../../../shared/models/review";
import {faStar, faUserTie} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  @Input({required: true}) review!: Review;
  faStar = faStar;
  avatar = faUserTie;
}
