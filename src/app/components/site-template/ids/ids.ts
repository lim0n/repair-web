import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Credentials } from '@app/credentials.enum';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-ids',
  imports: [RouterLink],
  templateUrl: './ids.html',
  styleUrl: './ids.scss',
  host: { class: 'app-ids' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ids {
  readonly credentials = Credentials;
}
