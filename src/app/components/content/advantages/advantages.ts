import { Component, ViewEncapsulation } from '@angular/core';
import { OUR_ADVANTAGES } from './advantages.config';

@Component({
  selector: 'app-advantages',
  imports: [],
  templateUrl: './advantages.html',
  styleUrl: './advantages.scss',
  host: { class: 'app-advantages' },
  encapsulation: ViewEncapsulation.None
})
export class Advantages {
  readonly data = OUR_ADVANTAGES;
}
