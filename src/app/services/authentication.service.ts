import { HttpClient } from '@angular/common/http';
import { DOCUMENT, Inject, Injectable } from '@angular/core';
import { IUser } from '@interfaces/user.interface';
import { BehaviorSubject, map, Observable, skip, Subject, tap } from 'rxjs';
import { environment } from '@src/environments/environment';
import { PlatformService } from './platform.service';
import { IJwt } from '@interfaces/jwt.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private userData$$ = new BehaviorSubject<IJwt | null>(null);
    private localStorage: Storage | undefined;

    constructor(
        private http: HttpClient,
        private _platform: PlatformService,
        @Inject(DOCUMENT) private _document: Document
    ) {
        if (this._platform.isServer) return;
        this.localStorage = this._document.defaultView?.localStorage;
        this.userData$$.next( JSON.parse( <string>this.localStorage?.getItem('currentUser') ) );
        this.userData$$
            .pipe(skip(1))
            .subscribe(data=>{
                if (data !== null) {
                    this.localStorage?.setItem('currentUser', JSON.stringify(data));
                } else {
                    this.localStorage?.removeItem('currentUser');
                };
            })
    }

    public get currentUserValue(): IUser | null {
        return this.userData$$.value;
    }

    login(username: string, password: string) {
        return this.http.post<IJwt>(`${environment.apiUrl}/auth/login`,
            { username, password })
            .pipe(
                tap(data => {
                        this.setData(data);
                    }));
    }

    logout() {
        this.userData$$.next(null);
    }

    setData(data: IJwt) {
        this.userData$$.next(data);
    }
}
