import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { LoginCell } from '../login-cell/login-cell';
import { CookieAccept } from '../cookie-accept/cookie-accept';
import { Ids } from '../ids/ids';
import { Logo } from '@components/logo/logo';
import { Credentials } from '@app/credentials.enum';

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
    Ids,
    Logo
  ]
})
export class FooterComponent {
  readonly credentials = Credentials;
  readonly tel = `tel:${this.credentials.Phone}`;
}
