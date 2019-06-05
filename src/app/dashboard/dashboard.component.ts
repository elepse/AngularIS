import { Component, OnInit } from '@angular/core';
import { Request} from '../request';
import {RequestService} from '../request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  requests: Request[] = [];

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.getRequests();
  }
  getRequests(): void {
    this.requestService.getRequests().subscribe(requests => this.requests = requests);
  }

}
