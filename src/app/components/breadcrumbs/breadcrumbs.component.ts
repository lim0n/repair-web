import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbsService } from '@app/services/breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  imports: [ RouterLink],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  host: { class: 'breadcrumbs' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbsComponent {
  bs = inject(BreadcrumbsService);
}
