import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { HowWeWorks } from "@components/content/how-we-works/how-we-works";
import { Advantages } from '@components/content/advantages/advantages';
import { ProductCollage } from '@pages/_common/product-collage/product-collage';

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
    ProductCollage,
  ]
})
export class Home {

}
