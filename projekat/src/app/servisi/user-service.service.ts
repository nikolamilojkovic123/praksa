import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { User } from '../klase/user';


import { Observable } from 'rxjs';

import { environment } from '../../environments/environment'
import { AuthService } from '../servisi/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor
  (
    
    private router: Router,
    private authService: AuthService,
    private toastr:ToastrService,
    private http:HttpClient,
  ) 
  { 

  }

  RegistrujKorisnika(user:User):Observable<any>
  {
    var url = environment.apiUrl;
    //console.log(user);
    return this.http.post(url+ "/register",user);
  }

  UlogujSe(user:User):Observable<any>
  {
    var url = environment.apiUrl+"/login";
    var header = new HttpHeaders();
    header.set('Accept','application/json');
    //console.log(user);

    let fd = new FormData();
    fd.append('email',user.email);
    fd.append('password',user.password);

    return this.http.post(url, user, {headers:header});

  }

  IzlogujSe():Observable<any>
  {
    var url = environment.apiUrl+"/logout";

    let bearerHeader:string = 'Bearer' + localStorage.getItem('access_token');
    var header = new HttpHeaders().set('authorization',bearerHeader);
    header.set('Accept','application/json');
    return this.http.get(url, {headers:header});
  }

}
