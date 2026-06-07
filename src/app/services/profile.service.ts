import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '@interfaces/user.interface';
import { environment } from '@src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { IProfile } from '@interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  userProfile$$ = new BehaviorSubject<IProfile | null>(null);
  userProfile$ = this.userProfile$$.asObservable();
  isLoggedIn$ = inject(AuthenticationService).isLoggedIn$;
  userData$$ = inject(AuthenticationService).userData$$;
  apiPathPrefix = environment.apiPathPrefix ? `/${environment.apiPathPrefix}` : '';

  constructor(
    private _api: HttpClient,
    private _authService: AuthenticationService
  ) {
    this.userData$$
      .subscribe(val => {
        if (val !== null) {
          this.getProfile().subscribe(val => {
            this.userProfile$$.next(val);
          })
        } else {
          this.userProfile$$.next(null);
        }
      })
  }

  getProfile(): Observable<any> {
    const url = new URL(`${this.apiPathPrefix}/auth/profile`, environment.apiUrl);
    return this._api.get(String(url));
  }
}
