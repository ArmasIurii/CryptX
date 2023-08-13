import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CoinDetailsComponent } from './coin-details/coin-details.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'coin', component: CoinDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
