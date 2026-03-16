import { HttpClient } from '@angular/common/http';
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

  getOrdersList(): Observable<IOrder[]> {
    const url = new URL(`/orders`, environment.apiUrl);
    return this._api.get<IOrder[]>(String(url));
  }

  getOrderById(id: string): Observable<IOrder> {
    const url = new URL(`/orders/${id}`, environment.apiUrl);
    return this._api.get(String(url));
  }

  getDetailedOrderById(id: string): Observable<IOrder> {
    const url = new URL(`/orders/${id}`, environment.apiUrl);
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
    const url = new URL(`/orders/user/${user_id}`, environment.apiUrl);
    return this._api.get<IOrder[]>(String(url));
  }

  updateOrder(id: string, item: IOrder): Observable<any> {
    const url = new URL(`/orders/${id}`, environment.apiUrl);
    return this._api.put<any>(String(url), item);
  }

  deleteOrder(id: string) {
    const url = new URL(`/orders/${id}`, environment.apiUrl);
    return this._api.delete<void>(String(url));
  }
}
