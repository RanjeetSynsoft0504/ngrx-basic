import { User } from './../../models/user';
import { loadUsers, loadUsersFailure, loadUsersSuccess } from './../actions/user.action';
import { createReducer, on } from '@ngrx/store';

export interface UserState {
  users: User[];
  loading: boolean;
  error: any;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, state => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({ ...state, loading: false, users })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
