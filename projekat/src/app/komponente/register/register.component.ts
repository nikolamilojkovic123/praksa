import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { TooltipPosition } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../klase/user'
import { UserServiceService } from '../../servisi/user-service.service';
import swal from 'sweetalert2';



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
          const toast = swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          
          toast({
            type: 'success',
            title: 'Signed up successfully',
            onClose: () => this.router.navigate(['/prijava'])
          })
        }
      },
      error=>{
        console.log("Error: "+error.error.message);
        swal({
          type: 'error',
          title: 'Oops...',
          text: error.error.message
        })
        
      });
  }

}
