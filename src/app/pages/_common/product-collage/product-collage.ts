import { ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit, signal, untracked, ViewEncapsulation } from '@angular/core';
import { SERVICE_PRODUCTS } from './product-collage.config';
import { BehaviorSubject, debounceTime, Observable, skip, Subject, tap } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IEntity } from '@interfaces/entity.interface';
import { WhatWeDo } from '@components/content/what-we-do/what-we-do';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AuthenticationService } from '@app/services/authentication.service';
import { PlatformService } from '@app/services/platform.service';
import { OrdersService } from '@app/services/orders.service';
import { ProfileService } from '@app/services/profile.service';
import { IOrder } from '@interfaces/order.interface';
import { UsersService } from '@app/services/users.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProfile } from '@interfaces/profile.interface';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { IUser } from '@interfaces/user.interface';
import { createOrderForm } from '@pages/crud/orders/_common/components/orders-form/utils/create-orders-form';
import { phonePrettier } from './utils/phone-prettier.function';
import { OrderDetailsService } from '@app/services/order-details.service';
import { RegexPatterns } from '@app/utils/patterns.const';
import { IOrderDetails } from '@interfaces/order-details.interface';
import { IOrderBanner } from '@interfaces/order-banner.interface';

@Component({
  selector: 'product-collage',
  imports: [
    WhatWeDo,
    AsyncPipe,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    JsonPipe,
  ],
  templateUrl: './product-collage.html',
  styleUrl: './product-collage.scss',
  host: { class: 'product-collage' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCollage implements OnInit, OnDestroy {
  readonly products = SERVICE_PRODUCTS;
  readonly path$ = new Subject<string>();
  product: IOrderBanner<IEntity[]> | undefined;
  userProfile$$ = inject(ProfileService).userProfile$$;
  orderData$$ = new BehaviorSubject<IOrder | null>(null);
  orderForm!: FormGroup;
  step$$ = new BehaviorSubject<'welcome' | 'interacted' | 'detailing'>('welcome');
  agree = signal(false);
  phoneNumberFieldValid = false;

  constructor(
    private _route: ActivatedRoute,
    private _platform: PlatformService,
    private _ordersService: OrdersService,
    private _authenticationService: AuthenticationService,
    private _usersService: UsersService,
    private _fb: FormBuilder,
    private _orderDetailsService: OrderDetailsService
  ) {
    if (this._platform.isServer) return;
    this.initSubscriptions();
  }

  ngOnInit(): void {
    this.orderForm = createOrderForm(this._fb);
    const phoneField = this.orderForm.get('phone');
    phoneField?.setValidators([Validators.required, Validators.pattern(RegexPatterns.PhoneValidation)]);
    phoneField?.valueChanges.subscribe(value=> {
        phoneField?.patchValue(phonePrettier(value), {emitEvent: false})
    });
    phoneField?.statusChanges.subscribe(status => {
      this.phoneNumberFieldValid = status === 'VALID';
    });

    this.path$.subscribe(data => {
      this.product = this.getProductByPath(data);
    })

    this._route.url.subscribe((data) => {
      this.path$.next(data.length ? data[0].path : '');
    });
  }

  initSubscriptions(): void {
    this.userProfile$$.subscribe(val => {
      if (val === null) {
        this.step$$.next('welcome');
      }

      if (val?.profile.agreements 
        && val.profile.agreements.length 
        && val.profile.agreements.some(agreement => agreement.name === 'obrabotka_pdn')) {
          this.agree.set(true)
      } else {
        this.agree.set(false)
      }
    });

    toObservable(this.agree)
      .pipe(
        debounceTime(2000),
        skip(1)
      )
      .subscribe(value => {
        value
          ? this.addAgreement()
          : this.removeAgreement()
      });
  }

  getProductByPath(path: string) {
    return this.products?.find(product => product.route === path)
  }

  onSubmit(): void {
    const { order_details, ...data } = this.orderForm.value;
    if (this.orderForm.valid) {
      this.updateOrder(data);
    }
    if (order_details) {
      const dto = { 
        details: order_details,
        author: data.user_id,
        order_id: data.id
      }
      this.createOrderDetails(dto);
    }
  }

  createOrderDetails(orderDetailsDto: IOrderDetails) {
    this._orderDetailsService.createOrderDetails(orderDetailsDto)
      .subscribe({
        next: (response) => {
          const currentOrder = this.orderData$$.value;
          if (currentOrder?.order_details && currentOrder.order_details.length) {
            currentOrder.order_details.push(response)
            this.orderData$$.next(currentOrder)
          } else {
            this.orderData$$.next({...currentOrder, order_details: [response]})
          }
        },
        error: (error) => {
          console.error('Error creating item', error);
        }
      });
  }

  setNextStep() {
    switch (this.step$$.value) {
      case 'welcome':
        this.onSubmitWelcome();
        break;
      case 'interacted':
        this.onSubmit()
        this.step$$.next('detailing')
        break
      case 'detailing':
        if (this.orderForm.value.name) {
          this.orderForm.get('isDraft')?.setValue(false);
        }
        this.onSubmit()
    }
  }

  onSubmitWelcome(): void {
    const dto:IOrder = {};
    const order: IOrder = {};
    if (this.userProfile$$.value === null) {
      this.createNewOrder();
    } else {
      let user: IProfile | null = this.userProfile$$.getValue();
      let sortedOrders, lastOrder;
      if (user !== null && user.profile && user.profile.orders && user.profile.orders.length) {
          sortedOrders = [...user.profile.orders].sort((a,b)=><string>a.created_at < <string>b.created_at ? 1 : -1)
          if (sortedOrders.length) {
            lastOrder = sortedOrders[0];
            this.orderData$$.next(lastOrder);
            this.orderForm.setValue({...lastOrder, order_details: null});
            if (lastOrder.isDraft === false) {
              this.step$$.next('detailing');
            } else {
              this.step$$.next('interacted');
            }
          } else {
            this.step$$.next('interacted');
          }
      } else if ( user !== null) {
        this.createNewOrder(user.profile.id);
      }
    }
  }

  createNewOrder(user_id?: number) {
    const payload: IOrder = {};
    if (user_id) {
      payload.user_id = user_id
    }
    if (this.product) {
      payload.order_name = this.product.orderName
    }
    this._ordersService.createOrder(payload)
      .subscribe({
        next: (response) => {
          const { tokens, ...orderData } = response;
          this.orderData$$.next(orderData);
          this.orderForm.setValue({...orderData, order_details: null});
          
          if (tokens) {
            this._authenticationService.setData(tokens);
          }
          this.step$$.next('interacted');
        },
        error: (error) => {
          console.error('Error creating item', error);
        }
      });
  }

  changeAgreement($event: Event) {
    this.agree.set(($event.target as HTMLInputElement).checked);
  }

  addAgreement() {
    const name = 'obrabotka_pdn';
    this._usersService.addAgreement({ name })
      .subscribe({
        next: (profile) => {
          const user = this.userProfile$$.getValue();
          if (user) {
            user.profile = profile;
          }
          this.userProfile$$.next(user);
        },
        error: (error) => {
          console.error('Error adding agreement', error);
        }
      });
  }

  removeAgreement() {
    const name = 'obrabotka_pdn';
    this._usersService.removeAgreement({ name })
      .subscribe({
        next: (profile) => {
          const user = this.userProfile$$.getValue();
          if (user) {
            user.profile = profile;
          }
          this.userProfile$$.next(user);
        },
        error: (error) => {
          console.error('Error adding agreement', error);
        }
      });
  }

  updateOrder(data: Partial<IOrder>): void {
    const currentOrderData = this.orderData$$.getValue();
    if (currentOrderData === null) return;
    const isDraft = data.isDraft;
    const { id } = currentOrderData;
    this._ordersService.updateOrder(String(id), data)
      .subscribe({
        next: (response) => {
          const user = this.userProfile$$.getValue();
          const orders = user?.profile?.orders;
          if (!orders || !orders.length) return;

          let index = orders.findIndex(order => order.id === id);
          const replaceObj = {...response};
          if (orders[index]?.order_details) {
            replaceObj.order_details = orders[index].order_details;
          }
          orders.splice(index,1,replaceObj); // есть ли details?
          this.userProfile$$.next(user);
          this.orderData$$.next(replaceObj);
        },
        error: (error) => {
          console.error('Error updating order item', error);
        }
      });
    if (isDraft === false) {
      this.orderForm.get('order_details')?.reset();
    }
  }

  ngOnDestroy(): void {
  }
}
