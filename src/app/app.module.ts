import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequeriesBoardComponent } from './requeries-board/requeries-board.component';
import {FormsModule} from '@angular/forms';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule} from '@angular/common/http';
import { RequestSearchComponent } from './request-search/request-search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthComponent } from './auth/auth.component';
import { TaskInfoComponent } from './task-info/task-info.component';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    RequeriesBoardComponent,
    RequestDetailComponent,
    MessagesComponent,
    DashboardComponent,
    RequestSearchComponent,
    AuthComponent,
    TaskInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
