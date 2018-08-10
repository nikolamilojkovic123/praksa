import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './komponente/home/home.component';
import { RegisterComponent } from './komponente/register/register.component';
import { LoginComponent } from './komponente/login/login.component';
import { PocetnaComponent } from './komponente/pocetna/pocetna.component';
import { MecComponent } from './komponente/pocetna/mec/mec.component';
import { ProfilComponent } from './komponente/profil/profil.component';




const routes :Routes = 
[
  { path:'', redirectTo:'home', pathMatch:'full' },
  { path:'home', component:HomeComponent},
  { path:'registracija', component:RegisterComponent },
  { path:'prijava', component:LoginComponent },
  { path:'igra', 
    children:
    [
      {path:'', component:PocetnaComponent},
      {path:'mec/:roomID', component:MecComponent},
    ]
  },
  { path:'profil/:userID', component: ProfilComponent},
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
