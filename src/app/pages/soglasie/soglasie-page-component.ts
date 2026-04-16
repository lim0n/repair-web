import { Component, ViewEncapsulation } from '@angular/core';
import { Soglasie } from '@components/content/soglasie/soglasie';

@Component({
  selector: 'app-soglasie-page-component',
  imports: [ Soglasie ],
  templateUrl: './soglasie-page-component.html',
  styleUrl: './soglasie-page-component.scss',
  host: { class: 'soglasie-page container' },
  encapsulation: ViewEncapsulation.None,
})
export class SoglasiePageComponent {}
