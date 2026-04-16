import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-ids',
  imports: [],
  templateUrl: './ids.html',
  styleUrl: './ids.scss',
  host: { class: 'app-ids' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ids {}
