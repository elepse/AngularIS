import {Injectable} from '@angular/core';
import {Request} from './request';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) {
  }

  private requestsUrl = 'api/requests';


  private handleError<T>(operation = 'operation ', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(this.requestsUrl).pipe(
      catchError(this.handleError<Request[]>('getRequests', []))
    );
  }

  getRequest(id: number): Observable<Request> {
    const url = this.requestsUrl + '/' + id;
    console.log(url);
    return this.http.get<Request>(url).pipe(
      catchError(this.handleError<Request>('getHero id=${id}'))
    );
  }

  updateRequest(request: Request): Observable<any> {
    return this.http.put(this.requestsUrl, request, httpOptions).pipe(
      catchError(this.handleError<any>('updateRequest'))
    );
  }

  addRequest(request: Request): Observable<Request> {
    return this.http.post<Request>(this.requestsUrl, request, httpOptions).pipe(
      catchError(this.handleError<Request>('addHero')),
    );
  }

  deleteRequest(request: Request | number): Observable<any> {
    const id = typeof request === 'number' ? request : request.id;
    const url = this.requestsUrl + '/' + id;
    return this.http.delete<Request>(url, httpOptions).pipe(
      catchError(this.handleError<Request>('deleteRequest'))
    );
  }

  searchRquests(term: string): Observable<Request[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Request[]>(`${this.requestsUrl}/?name=${term}`).pipe(
      catchError(this.handleError<Request[]>('searchRequests', []))
    );
  }

}
