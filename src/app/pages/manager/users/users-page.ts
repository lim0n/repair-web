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
  take,
  filter,
  map
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
  users$$ = new BehaviorSubject<IUser[]>([]);
  getListWithDeleted = true;

  constructor(
    private _usersService: UsersService
  ) { }

  readonly keepJsonOrder = keepJsonOrder;

  ngOnInit(): void {
    this._usersService.getUsersList(this.getListWithDeleted)
      .pipe(
        take(1),
        catchError(error => {
          console.warn('error', error, this.users$$.getValue());
          return of([]);
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

  onDelete(user: IUser) {
    this._usersService.deleteUser(String(user.id))
      .subscribe({
          next: () => {
            let users = this.users$$.getValue();
            users = users.filter(item => item.id !== user.id);
            this.users$$.next(users)
          },
          error: (error) => {
            console.error('Error deleting item', error);
          }
        });
  }

  onDeleteHard(user: IUser) {
    this._usersService.deleteUserHard(String(user.id))
      .subscribe({
        next: () => {
          let users = this.users$$.getValue();
          users = users.filter(item => item.id !== user.id);
          this.users$$.next(users)
        },
        error: (error) => {
          console.error('Error deleting item', error);
        }
      });
  }

}
