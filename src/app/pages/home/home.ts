import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { WhatWeDo } from '@components/content/what-we-do/what-we-do';
import { HowWeWorks } from "@components/content/how-we-works/how-we-works";

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  host: { class: 'home-page container' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    WhatWeDo,
    HowWeWorks
]
})
export class Home {

}
