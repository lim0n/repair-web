import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, Type, ViewEncapsulation } from '@angular/core';
import { IsVisibleDirective } from '@app/directives/is-visible.directive';

@Component({
  selector: 'popup-component',
  imports: [
    NgComponentOutlet,
    IsVisibleDirective
  ],
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

  @HostListener('click')
  onClick() {
    this.close();
  }

  @HostListener('window:keydown.escape')
  onEscapePressed() {
    this.close();
  }

  close() {
    this.closed.emit();
  }

  onElementVisible(visible: boolean): void {
    if (!visible) {
      this.close();
    }
  }
}
