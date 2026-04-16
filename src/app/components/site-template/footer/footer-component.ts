import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '@app/services/authentication.service';
import { LoginCell } from '../login-cell/login-cell';
import { CookieAccept } from '../cookie-accept/cookie-accept';
import { Ids } from '../ids/ids';

@Component({
  selector: 'footer-component',
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.scss',
  host: { class: 'footer-component container' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    LoginCell,
    CookieAccept,
    Ids
  ]
})
export class FooterComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((val: boolean) => {
      this.isLoggedIn = val;
    });
  }
}
