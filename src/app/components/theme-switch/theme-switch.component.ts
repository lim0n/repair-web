import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ColorSchemeService } from '@app/services/color-scheme.service';

@Component({
  selector: 'theme-switch',
  imports: [],
  templateUrl: './theme-switch.component.html',
  styleUrl: './theme-switch.component.scss',
  host: { class: 'theme-switch' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ThemeSwitch {
  public readonly themeService = inject(ColorSchemeService);

  toggle() {
    this.themeService.switchScheme();
  }
}
