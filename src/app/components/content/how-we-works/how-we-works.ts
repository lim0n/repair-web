import { Component, ViewEncapsulation } from '@angular/core';
import { HOW_WE_WORKS } from './how-we-works.config';

@Component({
  selector: 'how-we-works',
  templateUrl: './how-we-works.html',
  styleUrl: './how-we-works.scss',
  host: { class: 'how-we-works container' },
  encapsulation: ViewEncapsulation.None
})
export class HowWeWorks {
  readonly data = HOW_WE_WORKS;
;
}
