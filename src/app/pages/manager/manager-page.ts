import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ProfileService } from '@app/services/profile.service';
import { BehaviorSubject, catchError, Observable, of, take } from 'rxjs';

@Component({
  selector: 'app-manager-page',
  imports: [
    JsonPipe,
    AsyncPipe
  ],
  templateUrl: './manager-page.html',
  styleUrl: './manager-page.scss',
})
export class ManagerPage {
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
