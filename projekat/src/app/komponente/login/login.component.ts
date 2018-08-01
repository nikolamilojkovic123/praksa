import { Component, OnInit } from '@angular/core';

import { UserServiceService } from '../../servisi/user-service.service';
import { User } from '../../klase/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;

  user = new User();

  constructor
  (
    private userService:UserServiceService,
    private toastr: ToastrService
  ) 
  { }

  ngOnInit() {
  }

  PrijaviSe()
  {
    this.user.email=this.email;
    this.user.password=this.password;

    this.userService.UlogujSe(this.user);
   
  }

}
