import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../models/app.state';
import { login } from '../../../store/actions/auth.action';

@Component({
  selector: 'app-login',
  template: `
    <h2>Login</h2>
    <div *ngIf="error" class="alert alert-danger">{{ error }}</div>
    <form (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label>Email</label>
        <input type="email" class="form-control" [(ngModel)]="email" name="email" required />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" [(ngModel)]="password" name="password" required />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  `
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: any = null;

  constructor(private store: Store<AppState>) {}

  onSubmit() {
    const user = { email: this.email, password: this.password };
    this.store.dispatch(login({ user }));
  }
}
