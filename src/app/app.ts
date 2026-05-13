import { ChangeDetectionStrategy, Component, inject, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { PopupService } from './services/popup.service';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: { class: 'app-root' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterOutlet
  ],
})
export class App {
  protected readonly title = signal('web-app');

  constructor(
    private _auth: AuthenticationService,
    private _popup: PopupService,
  ) {}

  open() {
    this._popup.show(ModalComponent, 'message');
  }

  logout() {
    this._auth.logout();
  }
}
