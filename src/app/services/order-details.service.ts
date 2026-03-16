import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrderDetails } from '@interfaces/order-details.interface';
import { Observable } from 'rxjs';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsService {
  constructor(
    private _api: HttpClient
  ) {}

  getOrderDetailsList(): Observable<IOrderDetails[]> {
    const url = new URL(`/order-details`, environment.apiUrl);
    return this._api.get<IOrderDetails[]>(String(url));
  }

  getOrderDetailsById(id: string): Observable<IOrderDetails> {
    const url = new URL(`/order-details/${id}`, environment.apiUrl);
    return this._api.get(String(url));
  }

  getOrderDetailsByOrderId(order_id: string): Observable<IOrderDetails[]> {
    const url = new URL(`/order-details/order/${order_id}`, environment.apiUrl);
    return this._api.get<IOrderDetails[]>(String(url));
  }

  updateOrderDetails(id: string, item: IOrderDetails): Observable<any> {
    const url = new URL(`/order-details/${id}`, environment.apiUrl);
    return this._api.put<any>(String(url), item);
  }

  deleteOrder(id: string) {
    const url = new URL(`/order-details/${id}`, environment.apiUrl);
    return this._api.delete<void>(String(url));
  }
}
