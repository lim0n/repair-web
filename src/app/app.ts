import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Nav } from './components/nav/nav';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterOutlet,
    Nav
  ]
})
export class App {
  protected readonly title = signal('web-app');

  constructor(
    private _auth: AuthenticationService
  ) {}

  logout() {
    this._auth.logout();
  }
}
