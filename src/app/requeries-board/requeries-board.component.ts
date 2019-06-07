import {Component, OnInit} from '@angular/core';
import {Request} from '../request';
import {RequestService} from '../request.service';

@Component({
  selector: 'app-requeries-board',
  templateUrl: './requeries-board.component.html',
  styleUrls: ['./requeries-board.component.scss']
})
export class RequeriesBoardComponent implements OnInit {

  constructor(private requestService: RequestService) {
  }

  requests: Request[];

  getRequests(): void {
    this.requestService.getRequests().subscribe(requests => this.requests = requests);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.requestService.addRequest({name} as Request)
      .subscribe(request => this.requests.push(request));
  }

  delete(request: Request): void {
    this.requests = this.requests.filter(h => h !== request);
    this.requestService.deleteRequest(request).subscribe();
  }

  ngOnInit() {
    this.getRequests();
  }
}
