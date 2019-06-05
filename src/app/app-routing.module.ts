import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequeriesBoardComponent} from './requeries-board/requeries-board.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestDetailComponent} from './request-detail/request-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'requests', component: RequeriesBoardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'detail/:id', component: RequestDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
