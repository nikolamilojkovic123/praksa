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

import { AppComponent } from './app.component';
import { RegisterComponent } from './komponente/register/register.component';
import { HomeComponent } from './komponente/home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './komponente/login/login.component';
import { PocetnaComponent } from './komponente/pocetna/pocetna.component';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    PocetnaComponent
  ],
  imports: [
    BrowserModule,
   
    HttpClientModule,
    HttpModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
