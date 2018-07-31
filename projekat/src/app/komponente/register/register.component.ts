import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { TooltipPosition } from '@angular/material/tooltip';

import { User } from '../../klase/user'
import { UserServiceService } from '../../servisi/user-service.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  u = new User();
  potvrdaLozinke:string="";
  loseIme:string="";
  losEmail:string="";
  losePoklapanjeSifre:string="";
  losaSifra:string="";

  @Input('matTooltipPosition')
  position: TooltipPosition = "right";

  constructor
  (
    private router: Router,
    private userService : UserServiceService,
  ) 
  { }

  ngOnInit() {
  }


  proveriIme()
  {
    this.loseIme="";
    if(this.u.ime.length>15)
    {
      this.loseIme="Ime mora imati najvise 15 karaktera";
    }
    else
      this.loseIme="";
  }

  ProveriEmail()
  {
    
    this.losEmail=""
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var odgovorRe = re.test(String(this.u.email).toLowerCase());
    if(odgovorRe == false)
      this.losEmail = "Email je los";
    else
    {
      this.losEmail = "";
      /*this.userInfoService.ProveraPostojanjaEmaila(this.k.email).subscribe
      (
          (resp: any) =>
          { 
            if(resp[0].broj != 0)
              this.proveraEmail = this.ponovljenEmail;
            else
              this.proveraEmail = "";
          },
      );*/
    }

  }

  ProveraSifre()
  {
    this.losaSifra="";
    var re = /^(?=.*[čćđšža-z])(?=.*[ČĆĐŠŽA-Z])(?=.*[0-9])(?=.{8,})/;
    var odogovorRe = re.test(this.u.lozinka);
    if(odogovorRe==false)
    {
      this.losaSifra="Sifra je losa";
    }
    else
      this.losaSifra="";

    if (this.potvrdaLozinke != "")
      this.PoklapanjeSifri();
  }

  PoklapanjeSifri()
  {
    this.losePoklapanjeSifre="";
    if(this.u.lozinka!=this.potvrdaLozinke)
    {
      this.losePoklapanjeSifre="Lozinke se ne poklapaju";
    }
    else
      this.losePoklapanjeSifre = "";
  }


  RegistrujSe()
  {
    if
    (
      this.loseIme=="" && 
      this.losaSifra=="" && 
      this.losePoklapanjeSifre=="" && 
      this.losEmail=="" &&
      this.u.ime != null &&
      this.u.email != null && 
      this.u.lozinka != null &&
      this.u.ime != "" &&
      this.u.email != "" && 
      this.u.lozinka != ""
    )
    {
      
      this.userService.RegistrujKorisnika(this.u);
      /*this.userService.RegistrujKorisnika(this.u).subscribe((resp: any) =>
      {

      },
      (errorResp: any) =>
      {
        
      });*/
      this.router.navigate(["/prijava"]);
    }
  }

}
