import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  signal,
  Type,
  ViewEncapsulation
} from '@angular/core';
import { IsVisibleDirective } from '@app/directives/is-visible.directive';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'popup-component',
  imports: [
    NgComponentOutlet,
    IsVisibleDirective
  ],
  templateUrl: './popup-component.html',
  styleUrl: './popup-component.scss',
  host: { 
    '[class.fade-out]': 'isFadeout()',
    class: 'popup-component',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PopupComponent implements OnInit {
  @Output() closed = new EventEmitter();
  @Input() message!: string;
  @Input() component!: Type<any>;
  private readonly delaySubject = new Subject<boolean>();
  readonly isFadeout = signal(false);

  @HostListener('click')
  onClick() {
    this.close();
  }

  @HostListener('window:keydown.escape')
  onEscapePressed() {
    this.close();
  }

  ngOnInit() {
    this.delaySubject.pipe(
      debounceTime(500)
    ).subscribe(() => {
      this.close();
    });
  }

  close() {
    this.closed.emit();
  }

  onElementVisible(visible: boolean): void {
    if (!visible) {
      this.delaySubject.next(visible);
      this.isFadeout.set(true);
    }
  }
}
