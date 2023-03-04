import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  //modify request before is sent to the server:
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user$.pipe(
      take(1),
      exhaustMap((user: any) => {
        if (!user) {
          return next.handle(req);
        }

        //set a new token to the entire request:
        const modifiedRequest = req.clone({
          params: new HttpParams().set('auth', user?.token),
        });

        //chained next:
        return next.handle(modifiedRequest);
      })
    );
  }
}
