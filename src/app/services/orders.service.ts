import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '@interfaces/order.interface';
import { environment } from '@src/environments/environment';
import { catchError, forkJoin, map, Observable, of, switchMap, take } from 'rxjs';
import { UsersService } from './users.service';
import { OrderDetailsService } from './order-details.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(
    private _api: HttpClient,
    private _usersService: UsersService,
    private _orderDetailsService: OrderDetailsService
  ) {}

  getOrdersList(withDeleted?: boolean): Observable<IOrder[]> {
    const url = new URL(`/${environment.apiPathPrefix}/orders`, environment.apiUrl);
    const params = new HttpParams().set('withDeleted', String(Boolean(withDeleted)));
    return this._api.get<IOrder[]>(String(url), { params });
  }

  getOrderById(id: string): Observable<IOrder> {
    const url = new URL(`/${environment.apiPathPrefix}/orders/${id}`, environment.apiUrl);
    return this._api.get<IOrder>(String(url));
  }

  getDetailedOrderById(id: string): Observable<IOrder> {
    const url = new URL(`/${environment.apiPathPrefix}/orders/${id}`, environment.apiUrl);
    return this._api.get(String(url)).pipe(
      take(1),
      catchError(error => {
        return of(error);
      }),
      switchMap(order => {
        const user$ = this._usersService.getUserById(order.user_id);
        const details$ = this._orderDetailsService.getOrderDetailsByOrderId(order.id);
        return forkJoin([user$, details$]).pipe(
          map(([user, details]) => {
            order.user = user;
            order.order_details = details;
            return order;
          })
        )
      })
    );
  }

  getOrdersByUserId(user_id: string): Observable<IOrder[]> {
    const url = new URL(`/${environment.apiPathPrefix}/orders/user/${user_id}`, environment.apiUrl);
    return this._api.get<IOrder[]>(String(url));
  }

  updateOrder(id: string, item: IOrder): Observable<any> {
    const url = new URL(`/${environment.apiPathPrefix}/orders/${id}`, environment.apiUrl);
    return this._api.patch<any>(String(url), item);
  }

  deleteOrder(id: string): Observable<any> {
    const url = new URL(`/${environment.apiPathPrefix}/orders/${id}`, environment.apiUrl);
    return this._api.delete<void>(String(url));
  }

  hardDeleteOrder(id: string): Observable<any> {
    const url = new URL(`/${environment.apiPathPrefix}/orders/hard/${id}`, environment.apiUrl);
    return this._api.delete<void>(String(url));
  }

  createOrder(item: IOrder): Observable<any> {
    const url = new URL(`/${environment.apiPathPrefix}/orders`, environment.apiUrl);
    return this._api.post<any>(String(url), item);
  }
}
