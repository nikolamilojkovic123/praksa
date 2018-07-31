import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { User } from '../klase/user';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor
  (
    private http: Http,
    private router: Router,
  ) 
  { }

  RegistrujKorisnika(user:User)
  {
    console.log("prijavljeni ste");
    //return this.http.post(environment.apiUrl+"/registracija", formData).map(res=>res.json());
  }
}
