import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderDetailsService } from '@app/services/order-details.service';
import { PlatformService } from '@app/services/platform.service';
import { keepJsonOrder } from '@app/utils/keep-json-order-sort.function';
import { IOrderDetails } from '@interfaces/order-details.interface';
import { BehaviorSubject, catchError, EMPTY, of, take } from 'rxjs';

@Component({
  selector: 'app-order-details-page',
  imports: [
    AsyncPipe,
    KeyValuePipe,
    RouterLink,
  ],
  templateUrl: './order-details-page.component.html',
  styleUrl: './order-details-page.component.scss',
  host: { class: 'order-details-page' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsPage {
  orderDetails$$ = new BehaviorSubject<IOrderDetails[]>([]);
  getListWithDeleted = true;

  constructor(
    private _orderDetailsService: OrderDetailsService,
    private _platform: PlatformService
  ) {
    if (this._platform.isServer) return;
    this.initSubscriptions();
  }

  readonly keepJsonOrder = keepJsonOrder;
  
  initSubscriptions(): void {
    this._orderDetailsService.getOrderDetailsList(this.getListWithDeleted)
      .pipe(
        take(1),
        catchError(() => {
          return of([]);
        })
      ).subscribe(data => {
        this.orderDetails$$.next(data);
      })
  }

  onDelete(orderDetails: IOrderDetails) {
    this._orderDetailsService.deleteOrderDetails(String(orderDetails.id)).pipe(
      take(1),
      catchError(() => EMPTY))
    .subscribe({
      next: () => {
        let ordersDetails = this.orderDetails$$.getValue();
        ordersDetails = ordersDetails.filter(item => item.id !== orderDetails.id);
        this.orderDetails$$.next(ordersDetails);
      },
      error: (error) => {
        console.error('Error deleting item', error);
      }
    });
  }

  onDeleteHard(orderDetails: IOrderDetails) {
    this._orderDetailsService.hardDeleteOrderDetails(String(orderDetails.id)).pipe(
      take(1),
      catchError(() => EMPTY))
    .subscribe({
      next: () => {
        let ordersDetails = this.orderDetails$$.getValue();
        ordersDetails = ordersDetails.filter(item => item.id !== orderDetails.id);
        this.orderDetails$$.next(ordersDetails);
      },
      error: (error) => {
        console.error('Error deleting item', error);
      }
    });
  }
}
