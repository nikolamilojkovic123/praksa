import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servisi/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  login:boolean=false;


  constructor
  (
    private authService:AuthService,
    private router:Router,
  ) 
  {

    
    
  }

  ngOnInit() {
    this.login=this.authService.isSigned();
  }

  

  OdjaviSe()
  {
    this.authService.logout();
  }

  PrebaciNaPocetnu()
  {
    if(localStorage.getItem('acces_token') != null)
      console.log('prijavljen');
      //this.router.navigate(['/igra']);
    else
      //this.router.navigate(['/home']);
      console.log('nije prijavljen');

  }

}
