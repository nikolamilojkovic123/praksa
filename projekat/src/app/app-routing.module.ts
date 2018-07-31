import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './komponente/home/home.component';
import { RegisterComponent } from './komponente/register/register.component';
import { LoginComponent } from './komponente/login/login.component';

const routes :Routes = 
[
  { path:'', redirectTo:'home', pathMatch:'full' },
  { path:'home', component:HomeComponent},
  { path:'registracija', component:RegisterComponent },
  { path:'prijava', component:LoginComponent },
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
