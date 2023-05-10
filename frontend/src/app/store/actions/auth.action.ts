import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';
export const login = createAction('[Auth] Login', props<{ user: User }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ token: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());
export const logout = createAction('[Auth] Logout');
