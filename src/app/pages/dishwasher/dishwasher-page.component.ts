import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ProductCollage } from '@pages/_common/product-collage/product-collage';

@Component({
  selector: 'app-dishwasher-page',
  imports: [ ProductCollage ],
  templateUrl: './dishwasher-page.component.html',
  styleUrl: './dishwasher-page.component.scss',
  host: { class: 'dishwasher-page container' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishwasherPageComponent {

}
