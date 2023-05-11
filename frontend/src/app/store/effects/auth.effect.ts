import { Store } from '@ngrx/store';
import { AppState } from './../../models/app.state';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from '../actions/auth.action';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      map(action => action.user),
      exhaustMap(user =>
        this.authService.login(user).pipe(
          map(response => AuthActions.loginSuccess({ token: response.token })),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((response) => {
          this.router.navigateByUrl('/home')
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      map(action => action),
      exhaustMap(user =>
        this.authService.logout().pipe(
          map((response: any) => AuthActions.logoutSuccess({ message: response.message })),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          this.router.navigateByUrl('/auth/login');
        })
      ),
    { dispatch: false }
  );

  checkAuthenticationStatus() {
    const token: any = localStorage.getItem('token');
    if (token) {
      this.store.dispatch(AuthActions.loginSuccess({ token: token }));
      return;
    } else {
      this.store.dispatch(AuthActions.logout());
      return;
    }
  }

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) { }
}

