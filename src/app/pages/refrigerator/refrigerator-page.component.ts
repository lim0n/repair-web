import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ProductCollage } from '@pages/_common/product-collage/product-collage';

@Component({
  selector: 'app-refrigerator-page',
  imports: [ ProductCollage ],
  templateUrl: './refrigerator-page.component.html',
  styleUrl: './refrigerator-page.component.scss',
  host: { class: 'refrigerator-page container' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RefrigeratorPageComponent {

}
