import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { OrdersForm } from '@pages/crud/orders/_common/components/orders-form/orders-form';

@Component({
  selector: 'app-create-order-page',
  imports: [ OrdersForm ],
  templateUrl: './create-order-page.component.html',
  styleUrl: './create-order-page.component.scss',
  host: { class: 'create-order-page' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CreateOrderPage {

}
