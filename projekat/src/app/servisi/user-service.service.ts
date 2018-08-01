import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { User } from '../klase/user';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment'
import { AuthService } from '../servisi/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor
  (
    private http: Http,
    private router: Router,
    private authService: AuthService,
    private toastr:ToastrService,
  ) 
  { 

  }

  RegistrujKorisnika(user:User):Observable<any>
  {
    var url = environment.apiUrl;
    //console.log(user);
    return this.http.post(url+ "/register",user);
  }

  UlogujSe(user:User)
  {
    var url = environment.apiUrl;
    var headers = this.authService.BuildHeaders();
    //console.log(user);
    return this.http.post(url+ "/login",JSON.stringify(user), {headers: headers})
    .subscribe
             (
              
              (resp: any) =>
              {
                console.log("jedan");
                  // Sesija
                  localStorage.setItem('user', JSON.stringify(resp.user));

                  // Autorizacija
                  this.authService.LoginState(true);
                  this.authService.SaveToken(resp.token);

                   // Poruka
                   this.toastr.success(`Uspesno logovanje ${resp.user.korisnicko_ime}`);
                   this.router.navigate(["/igra"]);
                 
              }, 
              (errorResp: any) =>
              {
                console.log("dva");
                  this.authService.LoginState(false);
                  this.toastr.error("Greska");
              }
            );
  }
}
