import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'login-cell',
  templateUrl: './login-cell.html',
  styleUrl: './login-cell.scss',
  host: { class: 'login-cell' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    AsyncPipe
  ]
})
export class LoginCell {
  isLoggedIn$: Observable<boolean>;

  constructor(
    private _authenitacionService: AuthenticationService
  ) {
    this.isLoggedIn$ = this._authenitacionService.isLoggedIn$;
  }

  logout() {
    this._authenitacionService.logout();
  }
}
