import { selectAuthToken } from './store/selectors/auth.selectors';
import { AppState } from './models/app.state';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let authToken$: any;
    this.store.pipe(select(selectAuthToken)).subscribe((token) => {
      authToken$ = token;
    });
    if(authToken$) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken$}`)
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
