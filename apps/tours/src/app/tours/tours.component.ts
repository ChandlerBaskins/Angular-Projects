import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TourModel, ToursService } from '../tours.service';

@Component({
  selector: 'tour-list',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css'],
})
export class ToursComponent {
  tours$: Observable<TourModel[]>;
  error = false;
  constructor(private service: ToursService) {
    this.tours$ = this.service.tours$.pipe(
      catchError(() => {
        this.error = true;
        return EMPTY;
      })
    );
  }

}
