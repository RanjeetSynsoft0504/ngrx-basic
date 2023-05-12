import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const url = `${this.apiUrl}/users/list`;
    let results = this.http.post<User[]>(url, {})
    console.log(results);
    return results;
  }

  createUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/users/add`;
    return this.http.post<User>(url, user).pipe(
      map((response: User) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return throwError(() => error.error.message || 'An error occurred; please try again later.');
    } else {
      // The backend returned an error response. Handle it accordingly.
      console.error('Error response:', error.error);
      return throwError(() => error.error.message || 'Something bad happened; please try again later.');
    }
  }
}
