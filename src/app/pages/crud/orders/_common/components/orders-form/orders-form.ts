import { AsyncPipe, JsonPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormControlState, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
import { BreadcrumbsService } from '@app/services/breadcrumbs.service';
import { OrderDetailsService } from '@app/services/order-details.service';
import { OrdersService } from '@app/services/orders.service';
import { PopupService } from '@app/services/popup.service';
import { UsersService } from '@app/services/users.service';
import { keepJsonOrder } from '@app/utils/keep-json-order-sort.function';
import { IOrder } from '@interfaces/order.interface';
import { IUser } from '@interfaces/user.interface';
import { datetimeTzToDatetimeLocal } from '@pages/crud/users/user/utils/datetimetz-to-datetime-local.function';
import { BehaviorSubject, catchError, expand, filter, map, Observable, of, switchMap, take } from 'rxjs';

@Component({
  selector: 'orders-form',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    KeyValuePipe
  ],
  templateUrl: './orders-form.html',
  styleUrl: './orders-form.scss',
  host: { class: 'orders-form' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OrdersForm implements OnInit {
  detailedOrder$$ = new BehaviorSubject<IOrder | null>(null);
  orderForm!: FormGroup;
  serverError = false;
  orderid!: string;

  constructor(
    private _ordersService: OrdersService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _breadcrumbsService: BreadcrumbsService,
    private _router: Router,
    private _popupService: PopupService,
    private _authenticationService: AuthenticationService
  ) {
    
  }

  readonly keepJsonOrder = keepJsonOrder;

  ngOnInit(): void {

    if (this._route.snapshot.paramMap.get('id') !== null) {
      this.orderid = String(this._route.snapshot.paramMap.get('id'));
    };

    const formOptions: AbstractControlOptions = {
      updateOn: 'change'
    };

    this.orderForm = this._fb.group({
      id: [{value: '', disabled: true}],
      user_id: '',
      email: ['', [Validators.email, Validators.maxLength(50)]],
      name: ['', [Validators.maxLength(90)]],
      phone: ['', [Validators.maxLength(20)]],
      details: [null],
      created_at: [{value: '', disabled: true}],
      updated_at: [{value: '', disabled: true}],
      deleted_at: [{value: '', disabled: true}]
    }, formOptions);

    this.detailedOrder$$
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
        this.orderForm.patchValue(data);
        
        const title = data.name || data.email || data.phone || data?.user?.name || data?.user?.username;
        if (title) this._breadcrumbsService.changeLastTitle(String(title));
      });

    if (this.orderid) {
      this._ordersService.getDetailedOrderById(String(this.orderid))
        .pipe(
          take(1),
          catchError(error => {
            this.serverError = error;
            return of(error);
          }),
        )
        .subscribe((data) => {
          this.detailedOrder$$.next(data);
        });
    }
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const formData = this.orderForm.value;
      if (this.orderid) {        
        let { details, ...updateData } = formData;
        this._ordersService.updateOrder(this.orderid, updateData)
          .subscribe({
            next: (response) => {
              this._router.navigate(['..'], {relativeTo: this._route});
            },
            error: (error) => {
              console.error('Error updating item', error);
            }
          });
      }
      else {

        this._ordersService.createOrder(formData)
          .subscribe({
            next: (response) => {
              this._router.navigate(['..', response.id], {relativeTo: this._route});
              if (response.tokens) {
                this._authenticationService.setData(response.tokens);
              }
            },
            error: (error) => {
              console.error('Error creating item', error);
            }
          });
      }
    }
  }

  onDelete() {

    this._popupService.confirm('Удалить заказ?')
      .pipe(
        filter(Boolean),
        switchMap(() => {
          return this._ordersService.deleteOrder(this.orderid)
        })
      )
      .subscribe({
        next: () => {
          this._router.navigate(['..'], {relativeTo: this._route});
        },
        error: (error) => {
          console.error('Error deleting item', error);
        }
      });
    }
}
