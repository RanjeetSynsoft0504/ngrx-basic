import { UsersState } from './../reducers/user.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserState = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(
  selectUserState,
  state => state.users ?? []
);

export const selectUsersLoading = createSelector(
  selectUserState,
  state => state.loading ?? false
);

export const selectUsersError = createSelector(
  selectUserState,
  state => state.error ?? null
);

export const getUserCreateError = createSelector(
  selectUserState,
  state => state.error ?? null
);
