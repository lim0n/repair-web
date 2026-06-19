import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { HowWeWorks } from '@components/content/how-we-works/how-we-works';
import { ProductCollage } from '@pages/_common/product-collage/product-collage';

@Component({
  selector: 'app-dryer-page',
  imports: [ ProductCollage, HowWeWorks ],
  templateUrl: './dryer-page.component.html',
  styleUrl: './dryer-page.component.scss',
  host: { class: 'dryer-page container' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DryerPageComponent {

}
