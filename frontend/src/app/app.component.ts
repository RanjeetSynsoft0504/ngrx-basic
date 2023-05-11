import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './models/app.state';
import { logout } from './store/actions/auth.action';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">My App</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item" *ngIf="isLoggedIn">
            <a class="nav-link" [routerLink]="['/home']">Home</a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" *ngIf="isLoggedIn">
            <a class="nav-link" [routerLink]="['/users']">Users</a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" *ngIf="isLoggedIn">
            <a class="nav-link" (click)="onLogout()">Logout</a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" *ngIf="!isLoggedIn">
            <a class="nav-link" [routerLink]="['/auth/login']">Login</a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  isLoggedIn: boolean = false;

  constructor(private store: Store<AppState>) {
    store.select(state => state.auth).subscribe(auth => {
      console.log(auth);
      this.isLoggedIn = auth.isLoggedIn;
    });
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
