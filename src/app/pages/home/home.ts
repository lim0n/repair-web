import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { WhatWeDo } from '@components/content/what-we-do/what-we-do';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  host: { class: 'home-page container' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    WhatWeDo
  ]
})
export class Home {

}
