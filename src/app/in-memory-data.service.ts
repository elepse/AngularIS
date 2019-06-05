import {Injectable} from '@angular/core';
import {Request} from './request';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const requests = [
      {id: 11, name: 'Dr Nice'},
      {id: 12, name: 'Narco'},
      {id: 13, name: 'Bombasto'},
      {id: 14, name: 'Celeritas'},
      {id: 15, name: 'Magneta'},
      {id: 16, name: 'RubberMan'},
      {id: 17, name: 'Dynama'},
      {id: 18, name: 'Dr IQ'},
      {id: 19, name: 'Magma'},
      {id: 20, name: 'Tornado'}
    ];
    return {requests};
  }

  genId(requests: Request[]): number {
    return requests.length > 0 ? Math.max(...requests.map(request => request.id)) + 1 : 11;
  }

  constructor() {
  }
}
