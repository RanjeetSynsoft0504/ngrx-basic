import { AlertService } from './services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './models/app.state';
import { logout } from './store/actions/auth.action';

@Component({
  selector: 'app-root',
  template: `
  <section class="bg-light border-bottom">
    <div class="container">
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a class="navbar-brand" href="#">
              <img height="60px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQphz2qdDvnZEWFhCTzXHIyVFyWWXm8YEDd_DNRnTG&s" alt="">
            </a>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item" *ngIf="isLoggedIn">
                <a class="nav-link" [routerLink]="['/home']">Home</a>
              </li>
              <li class="nav-item" *ngIf="isLoggedIn">
              <a class="nav-link" [routerLink]="['/users']">Users</a>
            </li>
            </ul>
            <div class="right_nav">
              <div class="nav-item" *ngIf="!isLoggedIn">
                <a class="nav-link" [routerLink]="['/auth/login']">Login</a>
              </div>
              <div class="nav-item" *ngIf="isLoggedIn">
                <a class="nav-link" (click)="onLogout()">Logout</a>
              </div>
          </div>
          </div>
        </div>
      </nav>
    </div>
  </section>
  <app-alert *ngIf="(alertService.alert$ | async) as alert"></app-alert>
  <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private store: Store<AppState>, public alertService: AlertService) {
    store.select(state => state.auth).subscribe(auth => {
      console.log(auth);
      this.isLoggedIn = auth.isLoggedIn;
    });
  }

ngOnInit(): void {
  this.alertService.init();
}

  onLogout() {
    this.store.dispatch(logout());
  }
}
