import { User } from './../../../models/user';
import { selectUsers, selectUsersError, selectUsersLoading } from './../../../store/selectors/user.selectors';
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

  users$!: Observable<User[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<any>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadUsers());
    // this.store.pipe(select(selectUsers)).subscribe((users: any) => {
    //   this.users$ = users;
    // });
    this.users$ = this.store.select(selectUsers);
    this.loading$ = this.store.select(selectUsersLoading);
    this.error$ = this.store.select(selectUsersError);
  }

}
