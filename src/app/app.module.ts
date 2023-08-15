import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HeroComponent } from './components/hero/hero.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { PercentagePipe } from './percentage.pipe';
import { RecomendationComponent } from './components/recomendation/recomendation.component';
import { RecomendationItemComponent } from './components/recomendation/components/recomendation-item/recomendation-item.component';
import { CoinDetailsComponent } from './coin-details/coin-details.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { UrlDomainPipe } from './url-domain.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavBarComponent,
    HeroComponent,
    PercentagePipe,
    RecomendationComponent,
    RecomendationItemComponent,
    CoinDetailsComponent,
    UrlDomainPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    CanvasJSAngularChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
