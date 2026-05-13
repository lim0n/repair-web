import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  inputBinding,
  outputBinding,
  Type,
} from '@angular/core';
import { PopupComponent } from '@app/components/popup-component/popup-component';
import { ConfirmComponent } from '@components/confirm-component/confirm-component';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PopupService {
  private readonly injector = inject(EnvironmentInjector);
  private readonly appRef = inject(ApplicationRef);

  show(component: Type<any>, message?: string,) {
    // Create a host element for the popup
    const host = document.createElement('popup-host');
    // Create the component and bind in one call
    const ref = createComponent(PopupComponent, {
      environmentInjector: this.injector,
      hostElement: host,
      bindings: [
        inputBinding('message', () => message),
        inputBinding('component', () => component),
        outputBinding('closed', () => {
          document.body.removeChild(host);
          this.appRef.detachView(ref.hostView);
          ref.destroy();
        }),
      ],
    });
    // Registers the component’s view so it participates in change detection cycle.
    this.appRef.attachView(ref.hostView);
    // Inserts the provided host element into the DOM (outside the normal Angular view hierarchy).
    // This is what makes the popup visible on screen, typically used for overlays or modals.
    document.body.appendChild(host);
  }

  confirm(title?: string, message?: string): Observable<boolean> {
    const host = document.createElement('popup-host');
    const answer = new Subject<boolean>();
    const ref = createComponent(ConfirmComponent, {
      environmentInjector: this.injector,
      hostElement: host,
      bindings: [
        inputBinding('title', () => title),
        inputBinding('message', () => message),
        outputBinding('closed', (confirm: boolean) => {
          answer.next(confirm);
          document.body.removeChild(host);
          this.appRef.detachView(ref.hostView);
          ref.destroy();
        }),
      ],
    });
    this.appRef.attachView(ref.hostView);
    document.body.appendChild(host);
    return answer.asObservable();
  }
}
