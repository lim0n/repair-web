import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '@interfaces/user.interface';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private _api: HttpClient,
  ) { }

  getUsersList(withDeleted?: boolean): Observable<any> {
    const url = new URL(`/users`, environment.apiUrl);
    const params = new HttpParams().set('withDeleted', String(Boolean(withDeleted)));
    return this._api.get(String(url), { params });
  }

  getUserByUserName(username: string): Observable<any> {
    const url = new URL(`/users/${username}`, environment.apiUrl);
    return this._api.get(String(url));
  }

  getUserById(id: string): Observable<any> {
    const url = new URL(`/users/id/${id}`, environment.apiUrl);
    return this._api.get(String(url));
  }

  updateUser(id: string, item: IUser): Observable<any> {
    const url = new URL(`/users/${id}`, environment.apiUrl);
    return this._api.put<any>(String(url), item);
  }

  deleteUser(id: string) {
    const url = new URL(`/users/${id}`, environment.apiUrl);
    return this._api.delete<void>(String(url));
  }

  deleteUserHard(id: string) {
    const url = new URL(`/users/hard/${id}`, environment.apiUrl);
    return this._api.delete<void>(String(url));
  }

  createUser(item: IUser): Observable<any> {
    const url = new URL(`/users`, environment.apiUrl);
    return this._api.post<any>(String(url), item);
  }
  
}
