import { AppState } from './../../models/app.state';
import { createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const selectAuthState = (state: AppState) => state.auth;

export const selectAuthToken = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.token
);
