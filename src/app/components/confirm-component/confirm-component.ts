import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'confirm-component',
  imports: [],
  templateUrl: './confirm-component.html',
  styleUrl: './confirm-component.scss',
  host: { class: 'confirm-component' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ConfirmComponent {
  @Output() closed = new EventEmitter<boolean>();
  @Input() title = 'Подтвердите действие';
  @Input() message!: string;

  answer(decision: boolean) {
    this.closed.emit(decision);
  }
}
