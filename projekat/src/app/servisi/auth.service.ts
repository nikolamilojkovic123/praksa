import { EventEmitter,Injectable, Output } from '@angular/core';



import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private signed:boolean;
  @Output() isLogged = new EventEmitter<boolean>();

  constructor
  (
    private router:Router,
    private http:HttpClient,
  )
  {

  }

  signIn(answer:any):void
  {
    this.signed=true;

    localStorage.setItem('access_token',answer['access_token']);
    localStorage.setItem('username',answer['data'].name);
    localStorage.setItem('id',answer['data'].id);
    window.location.replace('/igra');

  }

  isSigned():boolean
  {
    localStorage.getItem('acces_token') != null ? this.signed=true : this.signed=false;
    this.isLogged.emit(this.signed);
    return this.signed;
  }

  logout()
  {
    localStorage.clear();
    window.location.replace('');
  }

  handleError(err:HttpErrorResponse)
  {
    if(err.error instanceof ErrorEvent)
      console.log("Error"+err.error.message);
    
    return EMPTY;
  }


}
