import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { OrdersForm } from '../_common/components/orders-form/orders-form';

@Component({
  selector: 'app-order-page',
  imports: [ OrdersForm ],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss',
  host: { class: 'order-page' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPageComponent {

}
