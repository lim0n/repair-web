import { HttpClient } from '@angular/common/http';
import { DOCUMENT, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, skip, tap } from 'rxjs';
import { environment } from '@src/environments/environment';
import { PlatformService } from './platform.service';
import { IJwt } from '@interfaces/jwt.interface';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    userData$$ = new BehaviorSubject<IJwt | null>(null);
    private localStorage: Storage | undefined;
    userData$ = this.userData$$.asObservable();
    isLoggedIn$ = this.userData$.pipe(map(data => !!data));

    constructor(
        private http: HttpClient,
        private _platform: PlatformService,
        @Inject(DOCUMENT) private _document: Document
    ) {
        if (this._platform.isServer) return;
        this.localStorage = this._document.defaultView?.localStorage;
        this.userData$$.next(JSON.parse(<string>this.localStorage?.getItem('currentUser')));
        this.userData$$
            .pipe(skip(1))
            .subscribe(data => {
                if (data !== null) {
                    this.localStorage?.setItem('currentUser', JSON.stringify(data));
                } else {
                    this.localStorage?.removeItem('currentUser');
                };
            })
    }

    public get currentUserValue(): IJwt | null {
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
        this.setData(null);
    }

    updateAccessToken(access_token: string) {
        if (this.currentUserValue !== null) {
            this.setData({ ...this.currentUserValue, access_token });
        }
    }

    setData(data: IJwt | null) {
        this.userData$$.next(data);
    }

    getAccessTokenByRefreshToken() {
        const refreshToken = this.currentUserValue?.refresh_token;
        return this.http.post<Partial<IJwt>>(`${environment.apiUrl}/auth/refresh-access-token`, { refreshToken })
    }
}
