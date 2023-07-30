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
import { SocketIoModule } from 'ngx-socket-io';
import { socketIoConfig } from './socket-io.config';
import { HttpClientModule } from '@angular/common/http';


const appRoutes: Routes=[
  {
    path:'', component:BarDashboardComponent
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
    SocketIoModule.forRoot(socketIoConfig),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
