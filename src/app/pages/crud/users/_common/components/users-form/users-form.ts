import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@app/services/users.service';
import { IUser } from '@interfaces/user.interface';
import { datetimeTzToDatetimeLocal } from '@pages/crud/users/user/utils/datetimetz-to-datetime-local.function';
import { take, catchError, of, filter, map, BehaviorSubject } from 'rxjs';
import { requiredUserIdField } from './user-id-field.validator';
import { BreadcrumbsService } from '@app/services/breadcrumbs.service';

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
    private _router: Router,
    private _breadcrumbsService: BreadcrumbsService
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
      username: [
        {value: '', disabled: this.username !== null},
        Validators.maxLength(30)
      ],
      password: ['', [Validators.maxLength(90)]],
      email: ['', [Validators.email, Validators.maxLength(50)]],
      name: ['', [Validators.maxLength(90)]],
      phone: ['', [Validators.maxLength(20)]],
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
      .subscribe(data => {
        this.userForm.patchValue(data);
        
        const title = data.name || data.email || data.username;
        if (title) this._breadcrumbsService.changeLastTitle(String(title));
      });

    if (this.username) {
      this._usersService.getUserByUserName(String(this.username))
        .pipe(
          take(1),
          catchError(error => {
            this.serverError = error;
            return of(error);
          })
        )
        .subscribe({
          next: (response) => {
            this.user$$.next(response);
            this.userid = response.id;
          },
          error: (error) => {
            console.error('Ошибка при запросе пользователя', error)
          }
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
        if (this.userid) {
          this._usersService.updateUser(this.userid, formData)
          .subscribe({
            next: (response) => {
              this._router.navigate(['..'], {relativeTo: this._route});
            },
            error: (error) => {
              console.error('Error updating item', error);
            }
          });
        } else {
          this._usersService.createUser(formData)
            .subscribe({
              next: (response) => {
                this._router.navigate(['..', 'id', response.id], {relativeTo: this._route});
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
              this._router.navigate(['..'], {relativeTo: this._route});
            },
            error: (error) => {
              console.error('Error deleting item', error);
            }
          });
    }
}
