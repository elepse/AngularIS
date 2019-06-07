import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequeriesBoardComponent} from './requeries-board/requeries-board.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestDetailComponent} from './request-detail/request-detail.component';
import {AuthComponent} from './auth/auth.component';

const routes: Routes = [
  {path: '', redirectTo: '/auth', pathMatch: 'full'},
  {path: 'requests', component: RequeriesBoardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: RequestDetailComponent},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
