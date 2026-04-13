import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '@app/services/authentication.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authenticationService = inject(AuthenticationService);

  return next(req).pipe(catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
          authenticationService.logout();
      }

      return throwError(() => error.error.message);
  }))
};
