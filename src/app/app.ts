import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ]
})
export class App {
  protected readonly title = signal('web-app');

  constructor(
    private _auth: AuthenticationService,
    // readonly routerLinkActive: Touterli
  ) {}

  logout() {
    this._auth.logout();
  }
}
