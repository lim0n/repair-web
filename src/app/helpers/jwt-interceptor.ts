import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '@app/services/authentication.service';
import { switchMap, take } from 'rxjs';


export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const authenticationService = inject(AuthenticationService);
    let currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.access_token) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.access_token}`
            }
        });
    }
    return next(req);
};
