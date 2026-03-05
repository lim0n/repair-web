import { ChangeDetectorRef, Component } from '@angular/core';
import { ColorSchemeService } from '@app/services/color-scheme.service';
import { IColorScheme } from '@interfaces/color-scheme.interface';

@Component({
  selector: 'theme-switch',
  imports: [],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss',
})
export class ThemeSwitch {
  currentTheme!: IColorScheme;

  constructor(
    private _colorSchemeService: ColorSchemeService,
    // private _cdr: ChangeDetectorRef
  ) {
    this.currentTheme = this._colorSchemeService.getScheme
  }

  toggle() {
    this._colorSchemeService.toggleScheme();
    // this._cdr.detectChanges();
  }

}
