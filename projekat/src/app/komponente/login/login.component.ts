import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { UserServiceService } from '../../servisi/user-service.service';
import { User } from '../../klase/user';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../servisi/auth.service';
import swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;

  user = new User();
  
  @Output() afterLogin = new EventEmitter<boolean>();
  signed: boolean = false;

  constructor
  (
    private userService:UserServiceService,
    private toastr: ToastrService,
    private authService:AuthService,
    private router: Router,
  ) 
  { }

  ngOnInit() {
  }

  PrijaviSe()
  {
    this.user.email=this.email;
    this.user.password=this.password;

    this.userService.UlogujSe(this.user).subscribe(
      answer =>
      {
        
        if(answer['access_token'] != null)
        {
          console.log('usao');
          this.authService.signIn(answer);
          this.afterLogin.emit(true);
          this.router.navigate(['/igra']);
        }
      },
      error=>{
        console.log("Error: "+error.error.message);
        swal({
          type: 'error',
          title: 'Oops...',
          text: error.error.message
        })
        this.afterLogin.emit(false);
      });
   
  }

  afterSignIn(signed: boolean):void{
    this.signed = signed;
  }

  afterSignOut(signout:boolean):void
  {
    this.signed = !signout;
  }

}
