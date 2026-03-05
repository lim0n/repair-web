import { ChangeDetectionStrategy, Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { PopupService } from './services/popup.service';
import { ModalComponent } from './components/modal/modal.component';
import { ColorSchemeService } from './services/color-scheme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: { class: 'app-root' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterOutlet
  ]
})
export class App implements OnInit {
  protected readonly title = signal('web-app');

  constructor(
    private _auth: AuthenticationService,
    private _popup: PopupService,
    private _colorSchemeService: ColorSchemeService
  ) {}

  ngOnInit(): void {
    this._colorSchemeService.toggleScheme(this._colorSchemeService.getScheme);
  }

  open() {
    this._popup.show('message', ModalComponent);
  }

  logout() {
    this._auth.logout();
  }
}
