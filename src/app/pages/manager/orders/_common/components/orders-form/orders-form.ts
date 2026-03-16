import { AsyncPipe, JsonPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormControlState, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderDetailsService } from '@app/services/order-details.service';
import { OrdersService } from '@app/services/orders.service';
import { UsersService } from '@app/services/users.service';
import { keepJsonOrder } from '@app/utils/keep-json-order-sort.function';
import { IOrder } from '@interfaces/order.interface';
import { IUser } from '@interfaces/user.interface';
import { datetimeTzToDatetimeLocal } from '@pages/manager/users/user/utils/datetimetz-to-datetime-local.function';
import { BehaviorSubject, catchError, expand, filter, map, Observable, of, switchMap, take } from 'rxjs';

@Component({
  selector: 'orders-form',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    JsonPipe,
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
      user_id: [{value: '', disabled: true}],
      email: ['', [Validators.email, Validators.maxLength(50)]],
      name: ['', [Validators.maxLength(90)]],
      phone: ['', [Validators.maxLength(20)]],
      created_at: [{value: '', disabled: true}],
      updated_at: [{value: '', disabled: true}],
      deleted_at: [{value: '', disabled: true}]
    }, formOptions);

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
        this.orderForm.patchValue(data);
      });
  }

  onSubmit(): void {}
}
