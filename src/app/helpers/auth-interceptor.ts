import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '@app/services/authentication.service';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
    const authenticationService = inject(AuthenticationService);
    return next(req).pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
            return authenticationService.getAccessTokenByRefreshToken().pipe(
                switchMap((jwt) => {
                    if (jwt && jwt.access_token !== undefined) {
                        authenticationService.updateAccessToken(jwt.access_token)
                    }
                    const clonedReq = req.clone({
                        setHeaders: { Authorization: `Bearer ${jwt.access_token}` }
                    });
                    return next(clonedReq);
                }),
                catchError((refreshError) => {
                    console.warn('catchError refreshError', refreshError);
                    console.warn('fire logout from authInterceptor')
                    authenticationService.logout();
                    return throwError(() => refreshError);
                })
            );
        }
        return throwError(() => error.error.message);
    }))
};
