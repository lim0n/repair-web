import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { OrderDetailsFormComponent } from '../_common/order-details-form/order-details-form';

@Component({
  selector: 'app-order-details-item-page',
  imports: [ OrderDetailsFormComponent],
  templateUrl: './order-details-item-page.component.html',
  styleUrl: './order-details-item-page.component.scss',
  host: { class: 'order-details-item-page' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsItemPageComponent {

}
