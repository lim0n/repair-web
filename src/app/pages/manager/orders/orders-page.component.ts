import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FnPipe } from '@app/pipes/fn-pipe';
import { OrdersService } from '@app/services/orders.service';
import { PlatformService } from '@app/services/platform.service';
import { keepJsonOrder } from '@app/utils/keep-json-order-sort.function';
import { BehaviorSubject, catchError, of, take } from 'rxjs';

@Component({
  selector: 'app-orders-page',
  imports: [
    AsyncPipe,
    KeyValuePipe,
    RouterLink,
  ],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
  host: { class: 'orders-page' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersPageComponent {
  orders$$ = new BehaviorSubject(null);

  constructor(
    private _ordersService: OrdersService,
    private _platform: PlatformService
  ) {
    if (this._platform.isServer) return;
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
        this.orders$$.next(data)
      })
  }
}
