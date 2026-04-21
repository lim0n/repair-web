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

@Component({
  selector: 'product-collage',
  imports: [
    WhatWeDo,
    JsonPipe,
    AsyncPipe
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
  orderData$$ = new BehaviorSubject<IOrder | null>(null);

  step$$ = new BehaviorSubject<'welcome' | 'interacted'>('welcome');

  constructor(
    private _route: ActivatedRoute,
    private _platform: PlatformService,
    private _ordersService: OrdersService,
    private _authenticationService: AuthenticationService
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
    });
  }

  getProductByPath(path: string) {
    return this.products?.find(product => product.route === path)
  }

  onSubmit(): void {
    if (!this.isLoggedIn) {
      this._ordersService.createOrder({})
        .subscribe({
          next: (response) => {
            console.warn('response', response);
            if (response.tokens) {
              this._authenticationService.setData(response.tokens);
              console.warn('fire next, must set step interacted');
              this.step$$.next('interacted');
            }
          },
          error: (error) => {
            console.error('Error creating item', error);
          }
        });
    } else {
      this.step$$.next('interacted');
      console.warn('fire else of !this.isLoggedIn, must set step interacted');
    }
  }

  ngOnDestroy(): void {
  }
}
