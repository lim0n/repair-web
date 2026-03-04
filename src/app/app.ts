import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Nav } from './components/nav/nav';
import { PopupService } from './services/popup.service';
import { ModalComponent } from './components/modal/modal.component';

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
    private _auth: AuthenticationService,
    private _popup: PopupService
  ) {}

  open() {
    this._popup.show('message', ModalComponent);
  }

  logout() {
    this._auth.logout();
  }
}
