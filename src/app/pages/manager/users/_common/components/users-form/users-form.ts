import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '@app/services/users.service';
import { IUser } from '@interfaces/user.interface';
import { datetimeTzToDatetimeLocal } from '@pages/manager/users/user/utils/datetimetz-to-datetime-local.function';
import { take, catchError, of, filter, map, BehaviorSubject } from 'rxjs';
import { requiredUserIdField } from './user-id-field.validator';

@Component({
  selector: 'users-form',
  imports: [ ReactiveFormsModule, AsyncPipe ],
  templateUrl: './users-form.html',
  styleUrl: './users-form.scss',
  host: { class: 'users-form' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UsersForm implements OnInit {
  user$$ = new BehaviorSubject<IUser | null>(null);
  userForm!: FormGroup;
  username!: string | null;
  userid!: string;
  serverError = false;

  constructor(
    private _usersService: UsersService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
  ) {
    
  }

  ngOnInit(): void {
    this.username = this._route.snapshot.paramMap.get('username');
    
    if (this._route.snapshot.paramMap.get('userid') !== null) {
      this.userid = String(this._route.snapshot.paramMap.get('userid'));
    };


    const formOptions: AbstractControlOptions = {
      validators: [ requiredUserIdField ],
      updateOn: 'change'
    };

    this.userForm = this._fb.group({
      id: [{value: '', disabled: true}],
      username: [{value: '', disabled: this.username !== null}],
      password: '',
      email: '',
      name: '',
      phone: '',
      user_role: '',
      created_at: [{value: '', disabled: true}],
      updated_at: [{value: '', disabled: true}]
    }, formOptions);

    this.user$$
      .pipe(
        filter(val => val != null),
        map(data => {
          if (data.created_at && typeof data.created_at === 'string') {
            data.created_at = datetimeTzToDatetimeLocal(data.created_at)
          }
          if (data.updated_at && typeof data.updated_at === 'string') {
            data.updated_at = datetimeTzToDatetimeLocal(data.updated_at)
          }
          return data;
        })
      )
      .subscribe(data => this.userForm.patchValue(data));

    if (this.username) {
      this._usersService.getUserByUserName(String(this.username))
        .pipe(
          take(1),
          catchError(error => {
            this.serverError = error;
            return of(error);
          })
        )
        .subscribe(data => {
          this.user$$.next(data);
          this.userid = data.id;
        });
    } else if (this.userid) {
      this._usersService.getUserById(String(this.userid))
        .pipe(
          take(1),
          catchError(error => {
            this.serverError = error;
            return of(error);
          })
        )
        .subscribe(data => {
          this.user$$.next(data);
        });
    }
  }

  onSubmit() {
      if (this.userForm.valid) {
        const formData: IUser = this.userForm.value;
  
        // if (formData.created_at && typeof formData.created_at === 'string') {
        //   const date = new Date(formData.created_at);
        //   const utcDate = new Date(date.getTime() + (3 * 60 * 60 * 1000));
        //   formData.created_at = utcDate.toISOString();
        // }

        if (this.userid) {
          this._usersService.updateUser(this.userid, formData)
          .subscribe({
            next: (response) => {
              console.warn('Item updated successfully', response);
              // Redirect or show a success message
              // this.user$$.next(response);
            },
            error: (error) => {
              console.error('Error updating item', error);
            }
          });
        } else {
          this._usersService.createUser(formData)
            .subscribe({
              next: (response) => {
                console.warn('Item create successfully', response);
                // Redirect or show a success message
                // this.user$$.next(response);
              },
              error: (error) => {
                console.error('Error creating item', error);
              }
            });
        }
      }
    }
  
    onDelete() {
      this._usersService.deleteUser(this.userid)
        .subscribe({
            next: (response) => {
              console.warn('Item deleted successfully', response);
              // Redirect or show a success message
              // this.user$$.next(response);
            },
            error: (error) => {
              console.error('Error deleting item', error);
            }
          });
    }
}
