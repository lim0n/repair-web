import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BreadcrumbsComponent } from '@components/breadcrumbs/breadcrumbs.component';
import { Logo } from '@components/logo/logo';

@Component({
  selector: 'app-manager-template',
    imports: [
    RouterOutlet,
    RouterLink,
    Logo,
    BreadcrumbsComponent
  ],
  host: { class: 'manager-template' },
  templateUrl: './manager-template.component.html',
  styleUrl: './manager-template.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerTemplateComponent {

}
