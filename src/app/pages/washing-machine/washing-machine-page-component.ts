import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'washing-machine',
  imports: [],
  templateUrl: './washing-machine-page-component.html',
  styleUrl: './washing-machine-page-component.scss',
  host: { class: 'washing-machine container' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WashingMachinePageComponent {

}
