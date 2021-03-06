import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class GameService {



  podaci:any = null;

  constructor
  (
    private router: Router,
    private authService: AuthService,
    private toastr:ToastrService,
    private http:HttpClient,
  ) 
  { 

  }


  Izazovi(idUsers:number)
  {
    var url = environment.apiUrl+"/challenges/"+idUsers;

    let bearerHeader:string = 'Bearer' + localStorage.getItem('access_token');
    var header = new HttpHeaders().set('authorization',bearerHeader);
    header.set('Accept','application/json');
    return this.http.get(url, {headers:header});
    
  }


  PrihvatiIzazov(challengeID:number)
  {
    var url = environment.apiUrl+"/challenges/accept/"+challengeID;

    let bearerHeader:string = 'Bearer' + localStorage.getItem('access_token');
    var header = new HttpHeaders().set('authorization',bearerHeader);
    header.set('Accept','application/json');
    return this.http.get(url, {headers:header});
  }

  OdbijIzazov(challengeID:number)
  {
    var url = environment.apiUrl+"/challenges/decline/"+challengeID;

    let bearerHeader:string = 'Bearer' + localStorage.getItem('access_token');
    var header = new HttpHeaders().set('authorization',bearerHeader);
    header.set('Accept','application/json');
    return this.http.get(url, {headers:header});
  }


  GameInfo(mecID)
  {
    var url = environment.apiUrl+"/games/"+mecID;

    let bearerHeader:string = 'Bearer' + localStorage.getItem('access_token');
    var header = new HttpHeaders().set('authorization',bearerHeader);
    header.set('Accept','application/json');
    return this.http.get(url, {headers:header});
  }

  odigraj(pozicija)
  {
    var url = environment.apiUrl+"/takes/"+pozicija;

    let bearerHeader:string = 'Bearer' + localStorage.getItem('access_token');
    var header = new HttpHeaders().set('authorization',bearerHeader);
    header.set('Accept','application/json');
    return this.http.get(url, {headers:header});
  }


  MedjusobniSkor(userID)
  {
    var url = environment.apiUrl+"/head-to-head/"+userID;

    let bearerHeader:string = 'Bearer' + localStorage.getItem('access_token');
    var header = new HttpHeaders().set('authorization',bearerHeader);
    header.set('Accept','application/json');
    return this.http.get(url, {headers:header});
  }

}
