import {
  AsyncPipe,
  KeyValuePipe
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
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
import { FnPipe } from '@app/pipes/fn-pipe';
import { IUser } from '@interfaces/user.interface';

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
    RouterLink,
    FnPipe
  ],
})
export class UsersPage implements OnInit {
  users$$ = new BehaviorSubject(null);

  constructor(
    private _usersService: UsersService
  ) {
    
  }

  ngOnInit(): void {
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

  getRoute(user: IUser): string[] {
    const route = ['.'];
    user?.username 
      ? route.push(user.username) 
      : route.push('id', String(user?.id));
    return route;
  }

  readonly keepJsonOrder = keepJsonOrder;
}
