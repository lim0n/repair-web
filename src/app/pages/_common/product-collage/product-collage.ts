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
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IProfile } from '@interfaces/profile.interface';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { IUser } from '@interfaces/user.interface';

@Component({
  selector: 'product-collage',
  imports: [
    WhatWeDo,
    JsonPipe,
    AsyncPipe,
    // ReactiveFormsModule,
    FormsModule,
    RouterLink
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
  product: IEntity<IEntity[]> | undefined;
  isLoggedIn$ = inject(AuthenticationService).isLoggedIn$;
  isLoggedIn = false;
  userProfile$ = inject(ProfileService).userProfile$;
  userProfile$$ = inject(ProfileService).userProfile$$;
  orderData$$ = new BehaviorSubject<IOrder | null>(null);
  // orderForm!: FormGroup;

  orderName$$ = new BehaviorSubject<string | null>(null);

  step$$ = new BehaviorSubject<'welcome' | 'interacted'>('welcome');
  stepSignal = toSignal(this.step$$.asObservable())

  nameControl = signal('');
  phoneControl = signal('');
  agree = signal(false);


  constructor(
    private _route: ActivatedRoute,
    private _platform: PlatformService,
    private _ordersService: OrdersService,
    private _authenticationService: AuthenticationService,
    private _usersService: UsersService,
    // private _fb: FormBuilder,
  ) {
    if (this._platform.isServer) return;
    this.initSubscriptions();

    effect(() => {
      const step = this.stepSignal();
      console.log('Signal value changed:', step);

        if (step === 'interacted') {
        const currentOrderData = this.orderData$$.getValue();

        if (currentOrderData !== null) {
          const { name, phone } = currentOrderData;
  
          untracked(() => {
            if (name) this.nameControl.set(name); 
            if (phone) this.phoneControl.set(phone)
          });
        }
      }
      
    });
  }

  ngOnInit(): void {
    this.path$.subscribe(data => {
      this.product = this.getProductByPath(data);
    })

    this._route.url.subscribe((data) => {
      this.path$.next(data.length ? data[0].path : '');
    });
  }

  initSubscriptions(): void {
    this.isLoggedIn$.subscribe(value => this.isLoggedIn = value);

    this.userProfile$.subscribe(val => {
      if (val === null) {
        this.step$$.next('welcome');
      }

      if (val?.profile.agreements && val?.profile.agreements.length && val.profile?.agreements?.some(profile => profile.name === 'obrabotka_pdn')) {
        this.agree.set(true)
      } else {
        this.agree.set(false)
      }
    });

    toObservable(this.nameControl)
      .pipe(
        debounceTime(2000),
        skip(1)
      )
      .subscribe(name => this.updateName(name));

    toObservable(this.phoneControl)
      .pipe(
        debounceTime(2000),
        skip(1)
      )
      .subscribe(phone => this.updatePhone(String(phone)));

    // toObservable(this.agree)
    //   .pipe(
    //     debounceTime(2000),
    //     skip(1)
    //   )
    //   .subscribe(value => {
    //     value
    //       ? this.addAgreement()
    //       : this.removeAgreement()
    //   });
  }

  getProductByPath(path: string) {
    return this.products?.find(product => product.route === path)
  }

  onSubmit(): void {
    const dto:IOrder = {};
    const order: IOrder = {};
    if (!this.isLoggedIn) {
      dto.user_id = this.userProfile$$.getValue()?.sub;
    }

    // if (this.isLoggedIn && )
    

    if (!this.isLoggedIn) {
      this._ordersService.createOrder({})
        .subscribe({
          next: (response) => {
            const { tokens, ...orderData } = response;
            this.orderData$$.next(orderData);
            if (tokens) {
              this._authenticationService.setData(tokens);
              this.step$$.next('interacted');
            }
          },
          error: (error) => {
            console.error('Error creating item', error);
          }
        });
    } else {
      let user: IProfile | null = this.userProfile$$.getValue();
      let sortedOrders, lastOrder;
      if (user !== null && user.profile && user.profile.orders && user.profile.orders.length) {
          sortedOrders = [...user.profile.orders].sort((a,b)=><string>a.created_at  < <string>b.created_at ? 1 : -1)
          
          if (sortedOrders.length) {
            lastOrder = sortedOrders[0];
            this.orderData$$.next(lastOrder)
          }
      }
      this.step$$.next('interacted');
    }
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

  updateName(name: string) {
    if (name) {
      this.updateOrder({name});
      this.updateUser({name});
    }
  }

  updatePhone(phone: string) {
    if (phone) {
      this.updateOrder({phone});
      this.updateUser({phone});
    }
  }

  updateOrder(data: Partial<IOrder>): void {
    const currentOrderData = this.orderData$$.getValue();
    if (currentOrderData === null) return;
    const { id, name, phone, isDraft } = currentOrderData;

    if ((data.name && data.name === name) 
          || (data.phone && data.phone === phone)
          || (data.isDraft && data.isDraft === isDraft)) return;

    this._ordersService.updateOrder(String(id), data)
      .subscribe({
        next: (response) => {
          const user = this.userProfile$$.getValue();
          const orders = user?.profile?.orders;

          if (orders && orders.length) {
            let index = orders.findIndex(order => order.id === id);
            orders.splice(index,1,response);
            this.userProfile$$.next(user);
          }

          console.warn('Updated order', response);
          this.orderData$$.next(response);
        },
        error: (error) => {
          console.error('Error updating order item', error);
        }
      });
  }

  updateUser(data: Partial<IUser>): void {
    const user = this.userProfile$$.getValue();
    if (!user || !user.profile) return;
    const { id, name, phone } = user.profile;

    if ((data.name && data.name === name) || (data.phone && data.phone === phone)) return;

    this._usersService.updateUser(String(id), data)
      .subscribe({
        next: (response) => {
          user.profile = response;
          this.userProfile$$.next(user);
          console.warn('Updated user', response);
        },
        error: (error) => {
          console.error('Error updating user item', error);
        }
      });
  }

  ngOnDestroy(): void {
  }
}
