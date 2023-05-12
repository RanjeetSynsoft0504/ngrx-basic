import { selectUsers, selectUsersLoading, selectUsersError } from './../../../store/selectors/user.selectors';
import { AppState } from './../../../models/app.state';
import { User } from './../../../models/user';
import { loadUsers } from './../../../store/actions/user.action';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  // users$: Observable<User[]>;
  // loading$: Observable<boolean>;
  // error$: Observable<string>;
  users$?: Observable<User[]>;
  loading$?: Observable<boolean>;
  error$?: Observable<string>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadUsers());
    console.log(this.store.select(selectUsers))
     this.users$ = this.store.select(selectUsers);
    this.loading$ = this.store.select(selectUsersLoading);
    this.error$ = this.store.select(selectUsersError);
    // this.users$ = this.store.select((state: AppState) => selectUsers(state.users));
    // this.loading$ = this.store.select((state: AppState) => selectUsersLoading(state.users));
    // this.error$ = this.store.select((state: AppState) => selectUsersError(state.users));
  }
}
