import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { UsersForm } from '@pages/manager/users/_common/components/users-form/users-form';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
  host: { class: 'user-page' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    UsersForm
  ],
})
export class UserPage {

}
