import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '@app/services/authentication.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  console.warn('FIRE auth interceptor');
  const authenticationService = inject(AuthenticationService);

  return next(req).pipe(catchError(err => {
      if (err.status === 401) {
          // auto logout if 401 response returned from api
          authenticationService.logout();
      }

      const error = err.error.message || err.statusText;
      return throwError(() => new Error(error));
  }))
};
