import { UserState } from './../store/reducers/user.reducer';
import { AuthState } from '../store/reducers/auth.reducer';

export interface AppState {
  auth: AuthState;
  users: UserState;
}
