import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';

@Component({
  selector: 'app-site-template-component',
  imports: [
    RouterOutlet,
    HeaderComponent
  ],
  host: { class: 'site-template' },
  templateUrl: './site-template.component.html',
  styleUrl: './site-template.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiteTemplateComponent {}
