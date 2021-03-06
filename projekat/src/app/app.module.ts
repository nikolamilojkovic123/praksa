import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatChipsModule } from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import {MatTableModule} from '@angular/material/table';
import { ChartModule } from 'angular-highcharts';


import { AppComponent } from './app.component';
import { RegisterComponent } from './komponente/register/register.component';
import { HomeComponent } from './komponente/home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './komponente/login/login.component';
import { PocetnaComponent } from './komponente/pocetna/pocetna.component';
import { NavbarComponent } from './komponente/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { MecComponent } from './komponente/pocetna/mec/mec.component';
import { ProfilComponent } from './komponente/profil/profil.component';

declare global{
  interface Window { io: any; }
  interface Window { Echo: any; }
}


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    PocetnaComponent,
    NavbarComponent,
    MecComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    MatChipsModule,
    HttpClientModule,
    HttpModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    ScrollToModule.forRoot(),
    MatTableModule,
    ChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
