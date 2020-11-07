import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import reviews from '../data';
export interface Review {
  id: number;
  name: string;
  job: string;
  image: string;
  text: string;
}
@Component({
  selector: 'angular-projects-mono-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent {
  //raw data
  baseReviewStream: Observable<Review[]> = of(reviews);
  //index
  indexSubject = new BehaviorSubject<number>(0);
  index$ = this.indexSubject.asObservable();

  //data for template
  review$ = combineLatest([this.baseReviewStream, this.index$]).pipe(
    map(([reviews, index]) => this.pageReviews(reviews, index))
  );

  //Obs for disabling

  disabledNextSubject = new BehaviorSubject<boolean>(false);
  disabledNext$ = this.disabledNextSubject.asObservable();
  disabledPrevSubject = new BehaviorSubject<boolean>(true);
  disabledPrev$ = this.disabledPrevSubject.asObservable();

  onClick(action: 'increment' | 'decrement') {
    if (action === 'increment') {
      const currentValue = this.indexSubject.getValue();
      this.indexSubject.next(currentValue + 1);
    } else {
      const currentValue = this.indexSubject.getValue();
      this.indexSubject.next(currentValue - 1);
    }
  }

  pageReviews(reviews: Review[], index: number) {
    console.log(reviews[index], index);
    if (index >= reviews.length - 1) {
      this.disabledNextSubject.next(true);
      this.disabledPrevSubject.next(false);
      return reviews[index];
    }
    if(index <= 0){
      this.disabledNextSubject.next(false);
      this.disabledPrevSubject.next(true);
    }

    if(index > 0 ){
      this.disabledPrevSubject.next(false)
    }

    return reviews[index];
  }
}
