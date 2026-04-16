import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { WhatWeDo } from '@components/content/what-we-do/what-we-do';
import { HowWeWorks } from "@components/content/how-we-works/how-we-works";
import { Advantages } from '@components/content/advantages/advantages';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  host: { class: 'home-page' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    WhatWeDo,
    HowWeWorks,
    Advantages
]
})
export class Home {

}
