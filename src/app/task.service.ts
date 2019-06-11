import {Injectable} from '@angular/core';
import {Task} from './task';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Request} from './request';
import {Location} from './location';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) {
  }

  private taskUrl = 'http://127.0.0.1:8000/api/tasks';

  private handleError<T>(operation = 'operation ', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  searchTasks(tasksFilter: Task): Observable<any> {
    return this.http.get<any[]>(`${this.taskUrl}/search?tittle=${tasksFilter.tittle}
    &date=${tasksFilter.createAt}
    &status=${tasksFilter.status}
    &creator=${tasksFilter.creator}
    &performing=${tasksFilter.performing}
    &location=${tasksFilter.location}
    &theme=${tasksFilter.theme}`).pipe(
      catchError(this.handleError<any>('getTasks', []))
    );
  }

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.taskUrl}/getLocations`).pipe(
      catchError(this.handleError<any[]>('getLocations', []))
    );
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.taskUrl}/getUsers`).pipe(
      catchError(this.handleError<any[]>('getUsers', []))
    );
  }

  addTask(tittleData, descriptionData, taskIdData, locationData): Observable<any> {
    return this.http.post(`${this.taskUrl}/addTask`, {
      title: tittleData,
      description: descriptionData,
      taskId: taskIdData,
      location: locationData
    }, httpOptions).pipe(
      catchError(this.handleError<any[]>('addTask'))
    );
  }

}
