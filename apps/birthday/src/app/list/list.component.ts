import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from '../app.component';

@Component({
  selector: 'app-list',
  template: `
    <div *ngFor="let person of people">
      <article
        (click)="onClick({ action: 'ClearSingle', id: person.id })"
        class="person"
      >
        <img [src]="person.image" />
        <div>
          <h4>{{ person.name }}</h4>
          <p>{{ person.age }} years</p>
        </div>
      </article>
    </div>
  `,
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @Input() people = [];
  @Output() selected = new EventEmitter();

  onClick(action: Action) {
    this.selected.emit(action)
  }
}
