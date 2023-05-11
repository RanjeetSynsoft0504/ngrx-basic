import { createAction, props } from '@ngrx/store';
import { AuthUser } from '../../models/auth-user';
export const login = createAction('[Auth] Login', props<{ user: AuthUser }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ token: string }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: any }>());
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success', props<{ message: string }>());
