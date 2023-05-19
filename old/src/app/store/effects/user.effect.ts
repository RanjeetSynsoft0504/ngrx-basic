import { AlertService } from './../../services/alert.service';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as UserActions from '../actions/user.action';

@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((res: any) => UserActions.loadUsersSuccess({ users: res.users })),
          catchError(error => of(UserActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  loadUsersSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loadUsersSuccess),
        tap((response) => {
          console.log(response)
        })
      ),
    { dispatch: false }
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      switchMap(({ user }) =>
        this.userService.createUser(user).pipe(
          map(() => UserActions.createUserSuccess()),
          catchError((error: any) => of(UserActions.createUserError({ error })))
        )
      )
    )
  );

  createUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.createUserSuccess),
        tap((response) => {
          UserActions.loadUsers()
          this.router.navigate(['/users']);
        })
      ),
    { dispatch: false }
  );

  createUserError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.createUserError),
        tap((action) => {
          console.error(action.error);
          this.alertService.error(action.error);
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private userService: UserService,private router: Router, private alertService: AlertService) {}
}
