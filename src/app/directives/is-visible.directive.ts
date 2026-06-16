import { 
  Directive, 
  ElementRef, 
  EventEmitter, 
  Input, 
  OnDestroy, 
  OnInit, 
  Output 
} from '@angular/core';

@Directive({
  selector: '[isVisible]',
  standalone: true
})
export class IsVisibleDirective implements OnInit, OnDestroy {
  // Configure intersection rules (e.g., threshold: 0.5 means 50% element visibility)
  @Input() options: IntersectionObserverInit = { root: null, threshold: 0.1 };
  
  // Emits true when entering viewport, false when leaving
  @Output() visibilityChange = new EventEmitter<boolean>();

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.observer = new IntersectionObserver(([entry]) => {
      this.visibilityChange.emit(entry.isIntersecting);
    }, this.options);

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}