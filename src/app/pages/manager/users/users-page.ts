import {
  AsyncPipe,
  KeyValuePipe
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '@app/services/users.service';
import {
  BehaviorSubject,
  catchError,
  of,
  take
} from 'rxjs';
import { keepJsonOrder } from '@app/utils/keep-json-order-sort.function';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.html',
  styleUrl: './users-page.scss',
  host: { class: 'users-page' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    AsyncPipe,
    KeyValuePipe,
    RouterLink
  ],
})
export class UsersPage {
  users$$ = new BehaviorSubject(null);

  constructor(
    private _usersService: UsersService
  ) {
    this._usersService.getUsersList()
      .pipe(
        take(1),
        catchError(error => {
          return of(error);
        })
      )
      .subscribe(data => {
        this.users$$.next(data);
      });
  }

  readonly keepJsonOrder = keepJsonOrder;
}
