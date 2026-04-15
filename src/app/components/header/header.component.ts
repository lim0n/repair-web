import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '@components/logo/logo';
import { ThemeSwitch } from '@components/theme-switch/theme-switch.component';

@Component({
  selector: 'app-header',
  imports: [ Logo, ThemeSwitch, RouterLink ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: { class: 'app-header container' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

}
