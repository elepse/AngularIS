import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequeriesBoardComponent } from './requeries-board/requeries-board.component';
import {FormsModule} from '@angular/forms';
import { RequestDetailComponent } from './request-detail/request-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    RequeriesBoardComponent,
    RequestDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
