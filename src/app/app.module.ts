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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GrowDirectionDirective } from './directive/grow-direction.directive';
import { LoginComponent } from './components/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { HoverDirective } from './hover.directive';
import { MatRippleModule } from '@angular/material/core';
import { ConverterComponent } from './components/converter/converter.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VoteCoinComponent } from './vote-coin/vote-coin.component';
import { MatChipsModule } from '@angular/material/chips';
import { DescriptionComponent } from './components/description/description.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HamburgerComponent } from './components/hamburger/hamburger.component';
import { MatDialogModule } from '@angular/material/dialog';



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
    ConverterComponent,
    VoteCoinComponent,
    DescriptionComponent,
    SignUpComponent,
    ThemeToggleComponent,
    HamburgerComponent,
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
    MatRippleModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
