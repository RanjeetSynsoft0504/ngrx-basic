import { AppState } from './../../models/app.state';
import { UserState } from './../reducers/user.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectUserState = createFeatureSelector<UserState>('user');

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

// export const selectUserState = (state: AppState) => state.users;
// export const selectUsersLoading = createSelector(
//   selectUserState,
//   (authState: UserState) => authState.users
// );

// export const selectUsers = createSelector(
//   selectUserState,
//   (authState: UserState) => authState.loading
// );

// export const selectUsersError = createSelector(
//   selectUserState,
//   (authState: UserState) => authState.error
// );
