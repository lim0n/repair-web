import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Type, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'popup-component',
  imports: [NgComponentOutlet],
  templateUrl: './popup-component.html',
  styleUrl: './popup-component.scss',
  host: { class: 'popup-component' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PopupComponent {
  @Output() closed = new EventEmitter();
  @Input() message!: string;
  @Input() component!: Type<any>;

  close() {
    this.closed.emit();
  }
}
