import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ProductCollage } from '@pages/_common/product-collage/product-collage';

@Component({
  selector: 'app-oven-page',
  imports: [ ProductCollage ],
  templateUrl: './oven-page.component.html',
  styleUrl: './oven-page.component.scss',
  host: { class: 'oven-page container' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OvenPageComponent {

}
