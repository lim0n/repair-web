import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RolesService } from '@app/services/roles.service';
import { keepJsonOrder } from '@app/utils/keep-json-order-sort.function';
import { IRole } from '@interfaces/role.interface';
import { BehaviorSubject, catchError, of, take } from 'rxjs';

@Component({
  selector: 'app-roles-page',
  templateUrl: './roles-page.component.html',
  styleUrl: './roles-page.component.scss',
  host: { class: 'users-page' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    AsyncPipe,
    KeyValuePipe,
    ReactiveFormsModule,
    RouterLink
  ],
})
export class RolesPageComponent implements OnInit {
  roles$$ = new BehaviorSubject<IRole[]>([]);
  roleForm!: FormGroup;

  constructor(
    private _rolesService: RolesService,
    private _fb: FormBuilder,
  ) { }

  readonly keepJsonOrder = keepJsonOrder;

  ngOnInit(): void {
    this._rolesService.getRolesList()
      .pipe(
        take(1),
        catchError(() => {
          return of([]);
        })
      )
      .subscribe(data => {
        this.roles$$.next(data);
      });
    
    this.roleForm = this._fb.group({
      id: [{value: '', disabled: true}],
      name: ['', [Validators.maxLength(20)]],
      description: ['', [Validators.maxLength(90)]],
    })
  }

  onDeleteHard(role: IRole) {
    this._rolesService.deleteRoleHard(String(role.id))
      .subscribe({
        next: () => {
          let roles = this.roles$$.getValue();
          roles = roles.filter(item => item.id !== role.id);
          this.roles$$.next(roles)
        },
        error: (error) => {
          console.error('Error deleting item', error);
        }
      });
  }

  add() {
    if (this.roleForm.valid) {
      const formData: IRole = this.roleForm.value;
      this._rolesService.createRole(formData)
        .subscribe({
          next: (response) => {
            const roles = this.roles$$.getValue();
            roles.push(response);
            this.roles$$.next(roles);
            this.roleForm.reset();
          },
          error: (error) => {
            console.error('Error creating item', error);
          }
        });
    }
  }
}
