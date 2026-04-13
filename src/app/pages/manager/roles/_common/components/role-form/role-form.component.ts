import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '@app/services/roles';
import { IRole } from '@interfaces/role.interface';
import { datetimeTzToDatetimeLocal } from '@pages/manager/users/user/utils/datetimetz-to-datetime-local.function';
import { BehaviorSubject, catchError, filter, map, of, take } from 'rxjs';

@Component({
  selector: 'role-form',
  imports: [AsyncPipe, JsonPipe, ReactiveFormsModule],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.scss',
  host: { class: 'role-form' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RoleFormComponent implements OnInit {
  role$$ = new BehaviorSubject<IRole | null>(null);
  roleForm!: FormGroup;
  roleName!: string;
  serverError = false;

  constructor(
    private _rolesService: RolesService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.roleName = String(this._route.snapshot.paramMap.get('name'));
    this.initForm();

    if (this.roleName) {
      this._rolesService.getRoleByName(this.roleName)
        .pipe(
          take(1),
          catchError(error => {
            this.serverError = error;
            return of(error);
          }),
        )
        .subscribe((data) => {
          this.role$$.next(data);
        });
    }

    this.role$$
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
        }))
      .subscribe(data => {
        this.roleForm.patchValue(data);
        
        // const title = data.name || data.email || data.phone || data?.user?.name || data?.user?.username;
        // if (title) this._breadcrumbsService.changeLastTitle(String(title));
      });
  }

  private initForm(): void {
    const formOptions: AbstractControlOptions = {
      updateOn: 'change'
    };

    this.roleForm = this._fb.group({
      id: [{value: '', disabled: true}],
      name: ['', [Validators.maxLength(20)]],
      description: ['', [Validators.maxLength(90)]],
    }, formOptions);
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      const formData = this.roleForm.value;
      this._rolesService.updateRole(this.roleName, formData)
        .subscribe({
          next: (response) => {
            this._router.navigate(['..'], {relativeTo: this._route});
          },
          error: (error) => {
            console.error('Error updating item', error);
          }
        });
    }
  }

}
