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
  on(AuthActions.loginSuccess, (state, { token }) => ({ ...state, token })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.logout, state => ({ ...state, token: null }))
);
