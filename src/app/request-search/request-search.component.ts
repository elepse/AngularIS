import {Component, OnInit} from '@angular/core';

import {Observable, Subject} from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import {Request} from '../request';
import {RequestService} from '../request.service';

@Component({
  selector: 'app-request-search',
  templateUrl: './request-search.component.html',
  styleUrls: ['./request-search.component.scss']
})
export class RequestSearchComponent implements OnInit {
  requests$: Observable<Request[]>;
  private searchTerms = new Subject<string>();

  search(term: string): void {
    this.searchTerms.next(term);
  }


  constructor(private requestService: RequestService) {
  }

  ngOnInit(): void {
    this.requests$ = this.searchTerms.pipe(
      debounceTime(300),

      distinctUntilChanged(),

      switchMap((term: string) => this.requestService.searchRquests(term))
    );
  }

}
