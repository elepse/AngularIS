import {Injectable} from '@angular/core';
import {Requests} from './requeries-board/mock-requests';
import {Request} from './request';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) {
  }

  private requestsUrl = 'api/requests';

  private handleError<T> (operation  = 'operation ', result?: T){
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
    return of(Requests.find(request => request.id === id));
  }
}
