import { HttpClient, HttpParams } from '@angular/common/http';
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

  getOrderDetailsList(withDeleted?: boolean): Observable<IOrderDetails[]> {
    const url = new URL(`/${environment.apiPathPrefix}/order-details`, environment.apiUrl);
    const params = new HttpParams().set('withDeleted', String(Boolean(withDeleted)));
    return this._api.get<IOrderDetails[]>(String(url), { params });
  }

  getOrderDetailsById(id: string): Observable<IOrderDetails> {
    const url = new URL(`/${environment.apiPathPrefix}/order-details/${id}`, environment.apiUrl);
    return this._api.get(String(url));
  }

  getOrderDetailsByOrderId(order_id: number): Observable<IOrderDetails[]> {
    const url = new URL(`/${environment.apiPathPrefix}/order-details/order/${order_id}`, environment.apiUrl);
    return this._api.get<IOrderDetails[]>(String(url));
  }

  updateOrderDetails(id: string, item: IOrderDetails): Observable<any> {
    const url = new URL(`/${environment.apiPathPrefix}/order-details/${id}`, environment.apiUrl);
    return this._api.patch<any>(String(url), item);
  }

  deleteOrderDetails(id: string): Observable<any> {
    const url = new URL(`/${environment.apiPathPrefix}/order-details/${id}`, environment.apiUrl);
    return this._api.delete<void>(String(url));
  }

  hardDeleteOrderDetails(id: string): Observable<any> {
    const url = new URL(`/${environment.apiPathPrefix}/order-details/hard/${id}`, environment.apiUrl);
    return this._api.delete<void>(String(url));
  }

  createOrderDetails(item: IOrderDetails): Observable<any> {
    const url = new URL(`/${environment.apiPathPrefix}/order-details`, environment.apiUrl);
    return this._api.post<any>(String(url), item);
  }
}
