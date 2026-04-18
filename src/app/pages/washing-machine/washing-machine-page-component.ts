import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ProductCollage } from '@pages/_common/product-collage/product-collage';

@Component({
  selector: 'washing-machine-page',
  imports: [ ProductCollage ],
  templateUrl: './washing-machine-page-component.html',
  styleUrl: './washing-machine-page-component.scss',
  host: { class: 'washing-machine-page container' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WashingMachinePageComponent {
}
