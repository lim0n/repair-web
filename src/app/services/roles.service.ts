import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRole } from '@interfaces/role.interface';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(
    private _api: HttpClient,
  ) { }

  getRolesList(): Observable<IRole[]> {
    const url = new URL(`/${environment.apiPathPrefix}/roles`, environment.apiUrl);
    return this._api.get<IRole[]>(String(url));
  }

  getRoleByName(name: string): Observable<IRole> {
    const url = new URL(`/${environment.apiPathPrefix}/roles/${name}`, environment.apiUrl);
    return this._api.get<IRole>(String(url));
  }

  createRole(item: IRole): Observable<IRole> {
    const url = new URL(`/${environment.apiPathPrefix}/roles`, environment.apiUrl);
    return this._api.post<IRole>(String(url), item);
  }

  deleteRoleHard(id: string) {
    const url = new URL(`/${environment.apiPathPrefix}/roles/hard/${id}`, environment.apiUrl);
    return this._api.delete<void>(String(url));
  }

  updateRole(name: string, item: IRole): Observable<any> {
    const url = new URL(`/${environment.apiPathPrefix}/roles/${name}`, environment.apiUrl);
    return this._api.patch<any>(String(url), item);
  }
}
