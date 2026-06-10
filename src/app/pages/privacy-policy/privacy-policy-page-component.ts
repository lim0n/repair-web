import { Component, DOCUMENT, Inject, ViewEncapsulation } from '@angular/core';
import { Credentials } from '@app/credentials.enum';
import { PlatformService } from '@app/services/platform.service';

@Component({
  selector: 'app-privacy-policy-page-component',
  imports: [],
  templateUrl: './privacy-policy-page-component.html',
  styleUrl: './privacy-policy-page-component.scss',
  host: { class: 'privacy-policy-page container' },
  encapsulation: ViewEncapsulation.None,
})
export class PrivacyPolicyPageComponent {
  domain!: string;
  readonly credentials = Credentials;

  constructor(
    private _platform: PlatformService,
    @Inject(DOCUMENT) private _document: Document
  ){
    if (this._platform.isServer) return;
    this.domain = this._document.location.origin;
  }
}
