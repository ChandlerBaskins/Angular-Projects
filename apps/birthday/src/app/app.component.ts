import { Component } from '@angular/core';
import { merge, of, Subject } from 'rxjs';
import data from './data';
import { scan } from 'rxjs/operators';

export interface Action {
  action: 'ClearAll' | 'ClearSingle';
  id?: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  people$ = of(data);
  private actionSubject = new Subject<Action>();
  action$ = this.actionSubject.asObservable();
  data$ = merge(this.people$, this.action$).pipe(
    scan((person: any, action: Action) => {
      return this.modifyPeople(person, action);
    })
  );

  onClick(action: Action) {
    console.log(action);
    this.actionSubject.next(action);
  }
  modifyPeople(person, action: Action) {
    if (action.action === 'ClearAll') return [];
    if (action.action === 'ClearSingle') {
      const id = action.id;
      return person.filter((p) => p.id !== id);
    }
  }
}
