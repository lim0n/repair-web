import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { OrderDetailsFormComponent } from '../_common/order-details-form/order-details-form';

@Component({
  selector: 'app-create-order-details-item-page',
  imports: [ OrderDetailsFormComponent ],
  templateUrl: './create-order-details-item-page.component.html',
  styleUrl: './create-order-details-item-page.component.scss',
  host: { class: 'create-order-details-item-page' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOrderDetailsItemPageComponent {

}
