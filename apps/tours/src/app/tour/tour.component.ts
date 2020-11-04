import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TourModel } from '../tours.service';

@Component({
  selector: 'tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css'],
})
export class TourComponent implements OnInit {
  readMore = false;
  tourInfo: Observable<string>;
  readMoreSubject = new BehaviorSubject<boolean>(this.readMore);
  readMoreAction$ = this.readMoreSubject.asObservable();
  @Input() tour: TourModel;

  ngOnInit() {
    this.tourInfo = combineLatest([of(this.tour), this.readMoreAction$]).pipe(
      map(([tour, readMore]) => {
        if (readMore) return tour.info;
        return tour.info.substring(0, 200);
      })
    );
  }

  clickReadMore() {
    this.readMore = !this.readMore;
    this.readMoreSubject.next(this.readMore);
  }


  onNotInterested(id:number){
    console.log(id)
  }
}
