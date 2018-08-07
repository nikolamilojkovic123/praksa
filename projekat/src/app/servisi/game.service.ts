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


  PrihvatiIzazov(challangeID:number)
  {
    var url = environment.apiUrl+"challenges/accept/"+challangeID;

    let bearerHeader:string = 'Bearer' + localStorage.getItem('access_token');
    var header = new HttpHeaders().set('authorization',bearerHeader);
    header.set('Accept','application/json');
    return this.http.get(url, {headers:header});
  }

  OdbijIzazov(challangeID:number)
  {
    var url = environment.apiUrl+"challenges/decline/"+challangeID;

    let bearerHeader:string = 'Bearer' + localStorage.getItem('access_token');
    var header = new HttpHeaders().set('authorization',bearerHeader);
    header.set('Accept','application/json');
    return this.http.get(url, {headers:header});
  }
}
