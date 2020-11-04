import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
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
  tours$ = this.http.get<TourModel[]>(this.rootUrl).pipe(
    map((tour) =>
      tour.map((t) => ({ ...t, sneekPeek: t.info.substring(0, 200) }))
    ),
    catchError((err) => {
      console.error(err);
      return throwError(err);
    }),
    shareReplay(1)
  );

  
  constructor(private http: HttpClient) {}
}
