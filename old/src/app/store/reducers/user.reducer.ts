import { User } from './../../models/user';
import { createUser, createUserError, createUserSuccess, loadUsers, loadUsersFailure, loadUsersSuccess, setUserCreateFormValues } from './../actions/user.action';
import { createReducer, on } from '@ngrx/store';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: any;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, state => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({ ...state, loading: false, users, error: null })),
  on(loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(setUserCreateFormValues, (state, { user }) => ({
    ...state,
    ...user,
  })),
  on(createUser, (state) => ({
    ...state,
    loading: true,
    error: '',
  })),
  on(createUserSuccess, (state) => ({
    ...state,
    loading: false,
    error: '',
  })),
  on(createUserError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
