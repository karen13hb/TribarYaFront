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
import { FormsModule } from '@angular/forms';
import { ModalGenerarReservaComponent } from './shared/Modals/modal-generar-reserva/modal-generar-reserva.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'; 
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import {MatInputModule} from '@angular/material/input';
import { InputTelComponent } from './shared/Resources/input-tel/input-tel.component';


const appRoutes: Routes=[
  {
    path:'', component:BarDashboardComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'modal',component:ModalGenerarReservaComponent
  },
  {
    path:'input',component:InputTelComponent
  },
  
];

@NgModule({
  declarations: [
    AppComponent,
    BarDashboardComponent,
    LoginComponent,
    ModalGenerarReservaComponent,
    InputTelComponent
   
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
    MatProgressBarModule,
    FormsModule,
    ScrollingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxMatIntlTelInputComponent,
    MatInputModule
  ],
  
  providers: [],
  
  bootstrap: [AppComponent],
  
})
export class AppModule { }
