import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { HowWeWorks } from "@components/content/how-we-works/how-we-works";
import { Advantages } from '@components/content/advantages/advantages';
import { WhatWeDo } from '@components/content/what-we-do/what-we-do';
import { SERVICE_PRODUCTS } from '@pages/_common/product-collage/product-collage.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  host: { class: 'home-page container' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HowWeWorks,
    Advantages,
    WhatWeDo
  ]
})
export class Home {
  readonly products = SERVICE_PRODUCTS;
}
