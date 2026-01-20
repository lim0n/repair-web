import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  constructor(
    private _api: HttpClient,
  ) { }

  getProfile(): Observable<any> {

    const url = new URL(`/auth/profile`, environment.apiUrl);
    // return this._api.get(String(url));
    console.warn(String(url));
    const x = this._api.get(String(url));
    console.warn(x);

    // const x = this._api.get<any>(`${environment.apiUrl}/auth/profile`, { mode: 'cors' });
    // console.warn('FIRE getProfile', `${environment.apiUrl}/auth/profile`, { mode: 'cors' });
    // console.warn(x);
    return x;
    // return this._api.get(`${environment.apiUrl}/auth/profile`, { mode: 'cors' });
  }
}
