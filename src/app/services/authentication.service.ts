import { HttpClient } from '@angular/common/http';
import { DOCUMENT, Inject, Injectable } from '@angular/core';
import { User } from '@interfaces/user.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '@src/environments/environment';
import { PlatformService } from './platform.service';

@Injectable({
    providedIn: 'root',
})
export class Authentication {
    private userData$$!: BehaviorSubject<User | null>;
    public currentUser$!: Observable<User | null>;

    constructor(
        private http: HttpClient,
        private _platform: PlatformService,
        @Inject(DOCUMENT) private _document: Document
    ) {
        if (this._platform.isServer) return;
        const localStorage = this._document.defaultView?.localStorage;
        if (localStorage) {
            this.userData$$ = new BehaviorSubject<User | null>( typeof localStorage.getItem('currentUser') === 'string' ? JSON.parse( <string>localStorage.getItem('currentUser') ) : null);
            this.currentUser$ = this.userData$$.asObservable();
        }
    }

    public get currentUserValue(): User | null {
        return this.userData$$.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/authenticate`,
            { username, password })
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.userData$$.next(user);
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.userData$$.next(null);
    }
}
