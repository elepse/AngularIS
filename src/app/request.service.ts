import { Injectable } from '@angular/core';
import { Requests} from './requeries-board/mock-requests';
import { Request } from './request';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor() {}

  getRequests(): Observable<Request[]> {
    return  of(Requests);
  }
}
