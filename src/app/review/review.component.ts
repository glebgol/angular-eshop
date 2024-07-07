import {Component, Input} from '@angular/core';
import {Review} from "../review";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  @Input({required: true}) review!: Review;


}
