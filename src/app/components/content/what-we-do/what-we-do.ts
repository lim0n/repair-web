import { Component, ViewEncapsulation } from '@angular/core';
import { WHAT_WE_DO } from './what-we-do.config';

@Component({
  selector: 'what-we-do',
  templateUrl: './what-we-do.html',
  styleUrl: './what-we-do.scss',
  host: { class: 'what-we-do container' },
  encapsulation: ViewEncapsulation.None
})
export class WhatWeDo {
  readonly data = WHAT_WE_DO;
}
