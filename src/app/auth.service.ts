import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Request} from './request';
import {User} from './user';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://127.0.0.1:8000/api';
  public authUser: { role: any; login: any; token: any };

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router, private location: Location) {
  }

  private handleError<T>(operation = 'operation ', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  saveLogin(userData): void {
    this.authUser = {
      login: userData.login,
      token: userData.token,
      role: userData.role
    };
    const user = JSON.stringify(this.authUser);
    console.log(user);
    const date = new Date();
    date.setHours(date.getHours() + 1);
    this.cookieService.set('authUser', user, date, '/');
  }

  checkAuth(): void {
    if (this.cookieService.check('authUser')) {
      const authUser = JSON.parse(this.cookieService.get('authUser'));
      const userData = {
        token: authUser.token,
        login: authUser.login,
        role: authUser.role
      };
      this.authUser = userData;
      this.http.post<any>(this.url + '/checkAuth', userData, httpOptions).subscribe(auth => {
        if (!auth.status) {
          this.router.navigateByUrl('/auth');
        } else {
          if (this.location.path() === '/auth') {
            this.location.back();
          }
          this.authUser = userData;
        }
      });
    } else {
      this.router.navigateByUrl('/auth');
    }
  }

  logIn(login: string, password: string): Observable<any> {
    const body = {loginData: login, passwordData: password};
    return this.http.post<User>(this.url + '/login', body, httpOptions).pipe(
      catchError(this.handleError<Request[]>('logIn'))
    );
  }

}
