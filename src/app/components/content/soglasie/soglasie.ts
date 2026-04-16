import { Component, DOCUMENT, Inject, ViewEncapsulation } from '@angular/core';
import { PlatformService } from '@app/services/platform.service';
import { Credentials } from '@app/credentials.enum';

@Component({
  selector: 'app-soglasie',
  imports: [],
  templateUrl: './soglasie.html',
  styleUrl: './soglasie.scss',
  host: { class: 'app-soglasie' },
  encapsulation: ViewEncapsulation.None,
})
export class Soglasie {
  domain!: string;
  readonly credentials = Credentials;
  readonly mailto = `mailto:${this.credentials.Email}`;

  constructor(
    private _platform: PlatformService,
    @Inject(DOCUMENT) private _document: Document
  ){
    if (this._platform.isServer) return;
    this.domain = this._document.location.origin;
  }
}
