import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './komponente/home/home.component';
import { RegisterComponent } from './komponente/register/register.component';
import { LoginComponent } from './komponente/login/login.component';
import { PocetnaComponent } from './komponente/pocetna/pocetna.component';

const routes :Routes = 
[
  { path:'', redirectTo:'home', pathMatch:'full' },
  { path:'home', component:HomeComponent},
  { path:'registracija', component:RegisterComponent },
  { path:'prijava', component:LoginComponent },
  { path:'igra', component:PocetnaComponent },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
