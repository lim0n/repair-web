import { DOCUMENT, Inject, Injectable, signal } from '@angular/core';
import { IColorScheme } from '@interfaces/color-scheme.interface';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root',
})
export class ColorSchemeService {
  private window!: Window | null;
  prefersDark: boolean | undefined;
  prefersLight: boolean | undefined;
  usedColorScheme!: IColorScheme;
  localStorage: Storage | undefined;

  private colorScheme = signal<IColorScheme>('light dark');
  public readonly currentColorScheme = this.colorScheme.asReadonly();
  

  constructor(
    private _platform: PlatformService,
    @Inject(DOCUMENT) private _document: Document,
  ) {
    if (this._platform.isServer) return;
    this.window = this._document.defaultView;
    this.localStorage = this.window?.localStorage;
    this.usedColorScheme = <IColorScheme>this.localStorage?.getItem('usedColorScheme');
    this.init();
    this.initSignal();
  }

  get getScheme(): IColorScheme {
    return this.usedColorScheme;
  }

  init(): void {
    this.prefersDark = this.window?.matchMedia('(prefers-color-scheme: dark)').matches;
    this.prefersLight = this.window?.matchMedia('(prefers-color-scheme: light)').matches;

    if (this.usedColorScheme === null) {
      this.usedColorScheme = this.prefersDark ? 'dark' : 'light';
    }
  }

  initSignal(): void {
    const storedScheme = <IColorScheme>this.localStorage?.getItem('usedColorScheme');
    if (storedScheme !== null) this.colorScheme.set(storedScheme);

  }

  selectInvertedScheme() {
    return this.usedColorScheme == 'dark' ? 'light' : 'dark';
  }

  toggleScheme(suggestedScheme?: IColorScheme) {
    const body = this._document.documentElement;
    
    this.usedColorScheme = suggestedScheme || this.selectInvertedScheme();
    this.colorScheme.set(suggestedScheme || this.selectInvertedScheme());

    this.localStorage?.setItem('usedColorScheme', this.usedColorScheme);
    body.style.colorScheme = this.usedColorScheme;
  }
  
}
