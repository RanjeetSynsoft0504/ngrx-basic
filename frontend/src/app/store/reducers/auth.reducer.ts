import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.action';

export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  error: any | null;
}

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  token: null,
  error: null
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, { token }) => ({ ...state, token, isLoggedIn: true, error: null })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.logout, state => ({ ...state})),
  on(AuthActions.logoutSuccess, state => ({ ...state, token: null, isLoggedIn: false, error: null }))
);
