import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Request} from './request';
import {User} from './user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {
  }

  private handleError<T>(operation = 'operation ', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  logIn(login: string, password: string): Observable<any> {
    const body = {loginData: login, passwordData: password};
    return this.http.post<User>(this.url + '/login', body, httpOptions).pipe(
      catchError(this.handleError<Request[]>('logIn'))
    );
  }

}
