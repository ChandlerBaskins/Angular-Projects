import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TourModel, ToursService } from '../tours.service';

@Component({
  selector: 'tour-list',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToursComponent {
  tours$: Observable<TourModel[] | string>;
  error = false;
  constructor(private service: ToursService) {
    this.tours$ = this.service.tours$.pipe(
      catchError(() => {
        this.error = true;
        return EMPTY;
      })
    );
  }
  onRefresh() {
    this.service.onRefresh();
  }
  notInterestedClick(id: string) {
    this.service.onNotInterested(id);
  }
}
