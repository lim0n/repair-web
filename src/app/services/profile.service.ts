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
    return this._api.get(String(url));
  }
}
