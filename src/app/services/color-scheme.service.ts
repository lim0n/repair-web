import { DOCUMENT, effect, Inject, Injectable, signal } from '@angular/core';
import { IColorScheme } from '@interfaces/color-scheme.interface';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root',
})
export class ColorSchemeService {
  private window!: Window | null;
  private prefersDark: boolean | undefined;
  private prefersLight: boolean | undefined;
  private localStorage: Storage | undefined;
  colorScheme = signal<IColorScheme>('light dark');

  constructor(
    private _platform: PlatformService,
    @Inject(DOCUMENT) private _document: Document,
  ) {
    if (this._platform.isServer) {
      this.appendHeadScript();
      return;
    };
    this.window = this._document.defaultView;
    this.localStorage = this.window?.localStorage;
    this.init();
  }

  switchScheme(suggestedScheme?: IColorScheme) {
    this.colorScheme.update((current) => {
      if (suggestedScheme) {
        return suggestedScheme;
      } else if (current === 'light dark' && this.prefersDark) {
        return 'light';
      } else if (current === 'light dark' && this.prefersLight) {
        return 'dark';
      } else {
        return current === 'dark' ? 'light' : 'dark';
      }
    });
  }

  private init(): void {
    this.prefersDark = this.window?.matchMedia('(prefers-color-scheme: dark)').matches;
    this.prefersLight = this.window?.matchMedia('(prefers-color-scheme: light)').matches;
    const storedScheme = <IColorScheme>this.localStorage?.getItem('color-scheme');
    if (storedScheme !== null) this.colorScheme.set(storedScheme);
    effect(() => {
      this.updateMarkup( this.colorScheme() );
      this.localStorage?.setItem('color-scheme', this.colorScheme());
    });
  }

  private updateMarkup(value: IColorScheme): void {
    const rootEl = this._document.documentElement;
    rootEl.dataset['theme'] = value;
  }

  private appendHeadScript() {
    var code = 'document.documentElement.dataset.theme = localStorage.getItem("color-scheme") || "light dark";';
    var scriptTag = this._document.createElement("script");
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.appendChild(this._document.createTextNode(code));
    this._document.head.appendChild(scriptTag);
  }
}
