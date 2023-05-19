import { loginSuccess } from './../store/actions/auth.action';
import { Store } from '@ngrx/store';
import { AppState } from './../models/app.state';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(user: { email: string; password: string }): Observable<{ token: string }> {
    const url = `${this.apiUrl}/auth/signin`;
    return this.http.post<{ token: string }>(url, user).pipe(
      tap(response => {
        console.log(response);
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout(): Observable<{ token: string }> {
    const url = `${this.apiUrl}/auth/logout`;
    return this.http.post<{ token: string }>(url, {}).pipe(
      tap(response => {
        console.log(response);
        localStorage.removeItem('token');
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
