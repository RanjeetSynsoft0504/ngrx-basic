import { User } from './../../models/user';
import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

export const setUserCreateFormValues = createAction(
  '[User Create] Set Form Values',
  props<{ user: User }>()
);

export const createUser = createAction(
  '[User Create] Create User',
  props<{ user: User }>()
);

export const createUserSuccess = createAction(
  '[User Create] Create User Success'
);

export const createUserError = createAction(
  '[User Create] Create User Error',
  props<{ error: string }>()
);
