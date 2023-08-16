import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarDashboardComponent } from './components/pages/bar-dashboard/bar-dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressBarModule } from '@angular/material/progress-bar';


const appRoutes: Routes=[
  {
    path:'', component:BarDashboardComponent
  },
  {
    path:'login',component:LoginComponent
  }
  
];

@NgModule({
  declarations: [
    AppComponent,
    BarDashboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
    HttpClientModule,
    ScrollingModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
