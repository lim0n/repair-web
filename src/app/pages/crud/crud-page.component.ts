import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ProfileService } from '@app/services/profile.service';
import { BehaviorSubject, catchError, of, take } from 'rxjs';

@Component({
  selector: 'app-manager-page',
  imports: [
    JsonPipe,
    AsyncPipe
  ],
  templateUrl: './crud-page.component.html',
  styleUrl: './crud-page.component.scss',
})
export class CrudPageComponent {
  profile$$ = new BehaviorSubject(null);

  constructor(
    private _api: ProfileService
  ) {
    this._api.getProfile()
      .pipe(
        take(1),
        catchError(error => of(error))
      )
      .subscribe(data => {
        this.profile$$.next(data);
      });
  }
}
