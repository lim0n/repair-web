import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '@app/services/authentication.service';
import { switchMap, take } from 'rxjs';


export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
      console.warn('FIRE jwtInterceptor');
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

    // const authenticationService = inject(AuthenticationService);

    // return authenticationService.getTokens.pipe(
    //     take(1),
    //     switchMap(tokens => {
    //         if (tokens) {
    //             req = req.clone({
    //                 setHeaders: { Authorization: `Bearer ${tokens.access_token}` }
    //             });
    //         }
    //         return next(req);
    //     })
    // );
};
