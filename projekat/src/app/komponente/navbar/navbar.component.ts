import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../servisi/auth.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../../servisi/user-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  login=false;
  @Output() afterLogout= new EventEmitter<boolean>()

  constructor
  (
    private authService:AuthService,
    private router:Router,
    private userService:UserServiceService,
  ) 
  {

    
    
  }

  ngOnInit() {
    if(this.authService.isSigned())
      this.login=true;
  }

  

  OdjaviSe()
  {
    this.userService.IzlogujSe().subscribe((resp: any) =>
    {
      console.log(resp);
      if(resp)
      {
        this.authService.logout();
        this.afterLogout.emit(true);
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

  PrebaciNaPocetnu()
  {
    //let login=this.authService.isSigned();
    if(this.authService.isSigned()==true)
      //console.log("prijavljen");
      this.router.navigate(['/igra']);
    else
    {  
      this.router.navigate(['/home']);
      //console.log('nije prijavljen');
      //let pom=this.authService.isSigned();
      //console.log(this.authService.isSigned()+"");
    }

  }

}
