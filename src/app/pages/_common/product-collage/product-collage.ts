import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { SERVICE_PRODUCTS } from './product-collage.config';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IEntity } from '@interfaces/entity.interface';
import { WhatWeDo } from '@components/content/what-we-do/what-we-do';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AuthenticationService } from '@app/services/authentication.service';
import { PlatformService } from '@app/services/platform.service';
import { OrdersService } from '@app/services/orders.service';
import { ProfileService } from '@app/services/profile.service';
import { IOrder } from '@interfaces/order.interface';
import { UsersService } from '@app/services/users.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProfile } from '@interfaces/profile.interface';

@Component({
  selector: 'product-collage',
  imports: [
    WhatWeDo,
    JsonPipe,
    AsyncPipe,
    // ReactiveFormsModule
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

  step$$ = new BehaviorSubject<'welcome' | 'interacted'>('welcome');

  agreed$$ = new BehaviorSubject<boolean>(false);


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
        this.agreed$$.next(true)
      } else {
        this.agreed$$.next(false)
      }
    });
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
      console.warn('SUBMIT lastOrder = ', lastOrder);
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

  ngOnDestroy(): void {
  }
}
