import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '@app/services/users.service';
import { IUser } from '@interfaces/user.interface';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  of,
  take,
  tap
} from 'rxjs';
import { datetimeTzToDatetimeLocal } from './utils/datetimetz-to-datetime-local.function';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
  host: { class: 'user-page' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    AsyncPipe,
    JsonPipe,
    ReactiveFormsModule
  ],
})
export class UserPage implements OnInit {
  user$$ = new BehaviorSubject<IUser | null>(null);
  username!: string;
  userid!: string;
  userForm: FormGroup;

  constructor(
    private _usersService: UsersService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
  ) {
    this.userForm = this._fb.group({
      id: [{value: '', disabled: true}],
      username: [{value: '', disabled: true}],
      password: '',
      email: '',
      name: '',
      phone: '',
      user_role: '',
      created_at: [{value: '', disabled: true}],
      deleted_at: [{value: '', disabled: true}]
    });
  }
  
  ngOnInit(): void {
    
    this.username = String(this._route.snapshot.paramMap.get('username'));

    this._usersService.getUserByUserName(String(this.username))
      .pipe(
        take(1),
        catchError(error => {
          return of(error);
        })
      )
      .subscribe(data => {
        this.user$$.next(data);
        this.userid = data.id;
      });

    this.user$$
      .pipe(
        filter(val => val != null),
        map(data => {
          if (data.created_at && typeof data.created_at === 'string') {
            data.created_at = datetimeTzToDatetimeLocal(data.created_at)
          }
          return data;
        })
      )
      .subscribe(data => this.userForm.patchValue(data));
      
    // this.userForm.patchValue(data);
  }

  onSubmit() {
    if (this.userForm.valid) {
      const updatedItem: IUser = this.userForm.value;

      if (updatedItem.created_at && typeof updatedItem.created_at === 'string') {

        // updatedItem.created_at = datetimeLocalToDatetimeTzUtcPlus_3(updatedItem.created_at);
        
        const date = new Date(updatedItem.created_at);
        const utcDate = new Date(date.getTime() + (3 * 60 * 60 * 1000));
        updatedItem.created_at = utcDate.toISOString();

      }
      
      this._usersService.updateUser(this.userid, updatedItem)

      // this.dataService.updateItem(this.itemId, updatedItem)
      .subscribe({
        next: (response) => {
          console.log('Item updated successfully', response);
          // Redirect or show a success message
          // this.user$$.next(response);
        },
        error: (error) => {
          console.error('Error updating item', error);
        }
      });
    }
  }

  onDelete() {
    console.warn('onDelete', this.userid);
    this._usersService.deleteUser(this.userid)
      .subscribe({
          next: (response) => {
            console.log('Item deleted successfully', response);
            // Redirect or show a success message
            // this.user$$.next(response);
          },
          error: (error) => {
            console.error('Error deleting item', error);
          }
        });
  }

}
