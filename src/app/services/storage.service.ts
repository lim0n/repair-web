import { DOCUMENT, Inject, Injectable } from '@angular/core';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private localStorage: Storage | undefined;

  constructor(
    private _platform: PlatformService,
    @Inject(DOCUMENT) private _document: Document
  ) {
    if (this._platform.isServer) return;
    this.localStorage = this._document.defaultView?.localStorage;
  }

  getItem(key: string): string | null | undefined {
    return this.localStorage?.getItem(key);
  }

  setItem(key: string, value: string): void {
    this.localStorage?.setItem(key, value);
  }

  removeItem(key: string): void {
    this.localStorage?.removeItem(key);
  }
}
