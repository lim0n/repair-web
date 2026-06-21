import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '@components/logo/logo';

@Component({
  selector: 'app-not-found-page',
  imports: [
    RouterLink,
    Logo
  ],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.scss',
  host: { class: 'not-found-page' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {

}
