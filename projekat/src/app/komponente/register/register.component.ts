import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { TooltipPosition } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
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
    private toastr: ToastrService,
  ) 
  { }

  ngOnInit() {
  }


  RegistrujSe()
  {
   
      //this.userService.RegistrujKorisnika(this.u);
      this.userService.RegistrujKorisnika(this.u).subscribe((resp: any) =>
      {
        console.log(resp);
        if(resp)
        {
          this.toastr.success(`Uspesno ste se registrovali`);
          this.router.navigate(["/prijava"]);
        }
      },
      (errorResp: any) =>
      {
        
        if (errorResp.message != null)
          this.toastr.error("Losi podaci");
      
      });
  }

}
