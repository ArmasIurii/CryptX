import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CoinDetailsComponent } from './components/coin-details/coin-details.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'coin', component: CoinDetailsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
