import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'spinner-circle',
  imports: [],
  templateUrl: './spinner-circle.html',
  styleUrl: './spinner-circle.scss',
  host: { class: 'spinner-circle' },
  encapsulation: ViewEncapsulation.None
})
export class SpinnerCircle {}
