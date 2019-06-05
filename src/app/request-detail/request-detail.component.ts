import {Component, OnInit, Input} from '@angular/core';
import {Request} from '../request';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RequestService} from '../request.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss']
})
export class RequestDetailComponent implements OnInit {
  request: Request;

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getRequest();
  }

  goBack(): void {
    this.location.back();
  }

  getRequest(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.requestService.getRequest(id)
      .subscribe(request => this.request = request);
  }

}
