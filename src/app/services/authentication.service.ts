import { HttpClient } from '@angular/common/http';
import { DOCUMENT, Inject, Injectable } from '@angular/core';
import { User } from '@interfaces/user.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '@src/environments/environment';
import { PlatformService } from './platform.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private userData$$ = new BehaviorSubject<User | null>(null);
    public currentUser$!: Observable<User | null>;
    localStorage: Storage | undefined;

    constructor(
        private http: HttpClient,
        private _platform: PlatformService,
        @Inject(DOCUMENT) private _document: Document
    ) {
        if (this._platform.isServer) return;
        this.localStorage = this._document.defaultView?.localStorage;
        if (localStorage) {
            this.userData$$.next( JSON.parse( <string>this.localStorage?.getItem('currentUser') ) );
            this.currentUser$ = this.userData$$.asObservable();
        }
    }

    public get currentUserValue(): User | null {
        return this.userData$$.value;
    }

    login(username: string, password: string) {
        console.warn('username, password', username, password);
        console.warn('FIRE AuthenticationService login', `${environment.apiUrl}/auth/login`)
        return this.http.post<any>(`${environment.apiUrl}/auth/login`,
            { username, password })
            .pipe(map(user => {
                this.localStorage?.setItem('currentUser', JSON.stringify(user));
                this.userData$$.next(user);
                return user;
            }));
    }

    logout() {
        console.warn('FIRE AuthenticationService logout');
        this.localStorage?.removeItem('currentUser');
        this.userData$$.next(null);
    }
}
