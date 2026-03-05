import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Logo } from '@components/logo/logo';
import { Nav } from '@components/nav/nav';
import { ThemeSwitch } from '@components/theme-switch/theme-switch.component';

@Component({
  selector: 'app-header',
  imports: [ Nav, Logo, ThemeSwitch ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: { class: 'app-header container' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

}
