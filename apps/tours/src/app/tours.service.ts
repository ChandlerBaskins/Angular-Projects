import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Subject,
  throwError,
} from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  scan,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
export interface TourModel {
  id: string;
  name: string;
  info: string;
  image: string;
  price: string;
}
@Injectable({
  providedIn: 'root',
})
export class ToursService {
  private rootUrl = 'https://course-api.com/react-tours-project';
  toursBase$ = this.http.get<TourModel[]>(this.rootUrl).pipe(
    map((tour) =>
      tour.map((t) => ({ ...t, sneekPeek: t.info.substring(0, 200) }))
    ),
    catchError((err) => {
      console.error(err);
      return throwError(err);
    }),
    shareReplay(1)
  );
  private refresh = new BehaviorSubject<boolean>(true);
  onRefresh(): void {
    console.log('REFRESHING');
    this.refresh.next(true);
  }
  toursBase2$ = this.refresh.pipe(
    switchMap(() =>
      this.http.get<TourModel[]>(this.rootUrl).pipe(
        catchError((err) => {
          console.error(err);
          return throwError(err);
        })
      )
    ),
    tap(() => console.log('got tours'))
  );
  private notInterestedSubject = new Subject<string>();
  notInterestedAction$ = this.notInterestedSubject.asObservable();

  onNotInterested(id: string) {
    this.notInterestedSubject.next(id);
  }

  tours$ = merge(this.toursBase2$, this.notInterestedAction$).pipe(
    scan((tours: TourModel[], notInterested: string) => {
      console.log('in scan TOURS:', tours, 'notInterseted', notInterested);
      if (tours.length !== 0) {
        return tours.filter((tour) => tour.id !== notInterested);
      }
      return notInterested;
    }) 
  );

  constructor(private http: HttpClient) {}
}
