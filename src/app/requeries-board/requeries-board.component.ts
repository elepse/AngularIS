import { Component, OnInit } from '@angular/core';
import {Request} from '../request';
import {RequestService} from '../request.service';

@Component({
  selector: 'app-requeries-board',
  templateUrl: './requeries-board.component.html',
  styleUrls: ['./requeries-board.component.scss']
})
export class RequeriesBoardComponent implements OnInit {

  constructor(private requestService: RequestService) { }

  requests: Request[];
  selectRequest: Request;

  getRequests(): void {
    this.requestService.getRequests().subscribe(requests => this.requests = requests);
  }

  ngOnInit() {
    this.getRequests();
  }

  onSelect(request: Request): void {
    this.selectRequest = request;
  }
}
