import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const url = `${this.apiUrl}/users/list`;
    let results = this.http.get<User[]>(url)
    console.log(results);
    return results;
  }
}
