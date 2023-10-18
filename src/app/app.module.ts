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
import { PercentagePipe } from './pipes/percentage.pipe';
import { RecomendationComponent } from './components/recomendation/recomendation.component';
import { RecomendationItemComponent } from './components/recomendation/components/recomendation-item/recomendation-item.component';
import { CoinDetailsComponent } from './components/coin-details/coin-details.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { UrlDomainPipe } from './url-domain.pipe';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GrowDirectionDirective } from './directive/grow-direction.directive';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { HoverDirective } from './hover.directive';
import { MatRippleModule } from '@angular/material/core';



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
    GrowDirectionDirective,
    LoginComponent,
    HoverDirective,
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
    FormsModule,
    MatProgressBarModule,
    MatCardModule,
    MatRippleModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
