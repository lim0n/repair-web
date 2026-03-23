import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { UsersForm } from '@pages/manager/users/_common/components/users-form/users-form';

@Component({
  selector: 'app-create-user-page',
  templateUrl: './create-user-page.html',
  styleUrl: './create-user-page.scss',
  host: { class: 'create-user-page' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    UsersForm
  ]
})
export class CreateUserPage {

}
