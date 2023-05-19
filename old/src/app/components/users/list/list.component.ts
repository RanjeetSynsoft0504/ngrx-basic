import { selectUsers, selectUsersLoading, selectUsersError, getUserCreateError } from './../../../store/selectors/user.selectors';
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
  userList: any = [];

  constructor(private store: Store) {}

  ngOnInit() {
     this.users$ = this.store.select(selectUsers);
     this.users$.subscribe(users => {
      this.userList = users;
    });
     if(this.userList.length === 0 ) {
      this.store.dispatch(loadUsers());
      this.loading$ = this.store.select(selectUsersLoading);
      this.error$ = this.store.select(selectUsersError);
    }

    this.store.select(getUserCreateError).subscribe((error) => {
      console.log(error)
      if (error) {
        console.log(error); // log the error message
        // this.userCreateForm.setErrors({ serverError: error });
      } else {
        // this.store.dispatch(loadUsers());
        // this.userCreateForm.reset();
        // this.router.navigate(['/users']);
      }
    });
  }
}
