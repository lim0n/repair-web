import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ProductCollage } from '@pages/_common/product-collage/product-collage';

@Component({
  selector: 'app-stove-page',
  imports: [ ProductCollage ],
  templateUrl: './stove-page.component.html',
  styleUrl: './stove-page.component.scss',
  host: { class: 'stove-page container' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StovePageComponent {

}
