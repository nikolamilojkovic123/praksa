import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servisi/auth.service';
import { UserServiceService } from '../../servisi/user-service.service'
import swal from 'sweetalert2';


@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  prijavljen:boolean=false;

  constructor
  (
    private authService:AuthService,
    private userService:UserServiceService,
  ) 
  { 
    
  }

  ngOnInit() {

    this.prijavljen=this.authService.isSigned();
  }

  OdjaviSe()
  {

    this.userService.IzlogujSe().subscribe((resp: any) =>
    {
      console.log(resp);
      if(resp)
      {
        this.authService.logout();
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
