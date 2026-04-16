import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { StorageService } from '@app/services/storage.service';

@Component({
  selector: 'cookie-accept',
  imports: [],
  templateUrl: './cookie-accept.html',
  styleUrl: './cookie-accept.scss',
  host: { 
    class: 'cookie-accept',
    '[animate.leave]': "'fade-out'"
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieAccept {
  isAccepted;

  constructor(
    private _storage: StorageService
  ){
    const storedData = this._storage.getItem('cookies');
    const initialValue = storedData ? JSON.parse(storedData) : false
    this.isAccepted = signal(initialValue);
  }

  accept() {
    this._storage.setItem('cookies', 'true');
    this.isAccepted.set(true);
  }
}
