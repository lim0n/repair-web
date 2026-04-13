import {
  AsyncPipe,
  KeyValuePipe
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrdersService } from '@app/services/orders.service';
import { PlatformService } from '@app/services/platform.service';
import { keepJsonOrder } from '@app/utils/keep-json-order-sort.function';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  of,
  take
} from 'rxjs';
import { IOrder } from '@interfaces/order.interface';

@Component({
  selector: 'app-orders-page',
  imports: [
    AsyncPipe,
    KeyValuePipe,
    RouterLink
  ],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss',
  host: { class: 'orders-page' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersPageComponent {
  orders$$ = new BehaviorSubject<IOrder[]>([]);
  getListWithDeleted = true;

  constructor(
    private _ordersService: OrdersService,
    private _platform: PlatformService
  ) {
    if (this._platform.isServer) return;
    this.initSubscriptions();
  }

  readonly keepJsonOrder = keepJsonOrder;

  initSubscriptions(): void {
    this._ordersService.getOrdersList(this.getListWithDeleted)
      .pipe(
        take(1),
        catchError(error => {
          return of(error);
        })
      ).subscribe(data => {
        this.orders$$.next(data);
      })
  }

  onDelete(order: IOrder) {
    this._ordersService.deleteOrder(String(order.id)).pipe(
      take(1),
      catchError(() => EMPTY))
    .subscribe({
      next: () => {
        let orders = this.orders$$.getValue();
        orders = orders.filter(item => item.id !== order.id);
        this.orders$$.next(orders);
      },
      error: (error) => {
        console.error('Error deleting item', error);
      }
    });
  }

  onDeleteHard(order: IOrder) {
    this._ordersService.hardDeleteOrder(String(order.id)).pipe(
      take(1),
      catchError(() => EMPTY))
    .subscribe({
      next: () => {
        let orders = this.orders$$.getValue();
        orders = orders.filter(item => item.id !== order.id);
        this.orders$$.next(orders);
      },
      error: (error) => {
        console.error('Error deleting item', error);
      }
    });
  }
}
