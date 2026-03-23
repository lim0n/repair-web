import { AsyncPipe, JsonPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FnPipe } from '@app/pipes/fn-pipe';
import { OrdersService } from '@app/services/orders.service';
import { PlatformService } from '@app/services/platform.service';
import { keepJsonOrder } from '@app/utils/keep-json-order-sort.function';
import { BehaviorSubject, catchError, EMPTY, Observable, of, take } from 'rxjs';
import { IOrder } from '@interfaces/order.interface';

@Component({
  selector: 'app-orders-page',
  imports: [
    AsyncPipe,
    KeyValuePipe,
    RouterLink,
    // JsonPipe
  ],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
  host: { class: 'orders-page' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersPageComponent {
  // orders$: Observable<any>;
  orders: IOrder[] = [];
  orders$$ = new BehaviorSubject<IOrder[] | null>(null);

  constructor(
    private _ordersService: OrdersService,
    private _platform: PlatformService
  ) {
    if (this._platform.isServer) return;
    // this.orders$ = new Observable.pipe(
    //   catchError(error => {
    //     return of(error);
    //   })
    // );
    this.initSubscriptions();
  }

  readonly keepJsonOrder = keepJsonOrder;

  initSubscriptions(): void {
    this._ordersService.getOrdersList()
      .pipe(
        take(1),
        catchError(error => {
          return of(error);
        })
      ).subscribe(data => {
        this.orders = data;
        this.orders$$.next(data);
      })
  }

  onDelete(order: IOrder) {
    this._ordersService.deleteOrder(String(order.id)).pipe(
      take(1),
      catchError(() => EMPTY))
    .subscribe((data) => {
      if (data?.affected) {
        this.orders = this.orders.filter(item => item.id !== order.id);
        this.orders$$.next(this.orders);
      }
    });
    
  }
}
