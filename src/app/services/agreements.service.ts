import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAgreement } from '@interfaces/agreement.interface';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AgreementsService {
  constructor(
    private _api: HttpClient,
  ) { }

  getAgreementsList(withDeleted?: boolean): Observable<any> {
    const url = new URL(`/agreements`, environment.apiUrl);
    const params = new HttpParams().set('withDeleted', String(Boolean(withDeleted)));
    return this._api.get(String(url), { params });
  }

  getAgreementByName(username: string): Observable<any> {
    const url = new URL(`/agreements/${username}`, environment.apiUrl);
    return this._api.get(String(url));
  }

  getAgreementById(id: string): Observable<any> {
    const url = new URL(`/agreements/id/${id}`, environment.apiUrl);
    return this._api.get(String(url));
  }

  updateAgreement(id: string, item: IAgreement): Observable<any> {
    const url = new URL(`/agreements/${id}`, environment.apiUrl);
    return this._api.patch<any>(String(url), item);
  }

  deleteAgreementHard(id: string) {
    const url = new URL(`/agreements/hard/${id}`, environment.apiUrl);
    return this._api.delete<void>(String(url));
  }

  createAgreement(item: IAgreement): Observable<any> {
    const url = new URL(`/agreements`, environment.apiUrl);
    return this._api.post<any>(String(url), item);
  }
  
}
