import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servisi/auth.service';
import { UserServiceService } from '../../servisi/user-service.service'
import swal from 'sweetalert2';
import Echo from 'laravel-echo';
import * as io from 'socket.io-client';

import { element } from '@angular/core/src/render3/instructions';


declare global{
  interface Window { io: any; }
  interface Window { Echo: any; }
}

declare var Echo: any;

window.io = window.io;
window.Echo = window.Echo || {};


@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  prijavljen:boolean=false;
  users = [];

  constructor
  (
    private authService:AuthService,
    private userService:UserServiceService,
  ) 
  { 
    window.io=io;
  }

  ngOnInit() {

    this.prijavljen=this.authService.isSigned();
    let token = 'Bearer' + localStorage.getItem('access_token');
     window.Echo = new Echo({
      broadcaster: 'socket.io',
      host: 'https://tictactoe.local:6003',

      auth:
      {
        headers:{
          'Authorization': token
        }
      }

    });

    window.Echo.join('lobby')
      .here((users)=>
      {
        users.forEach(element =>
        {
          if(element.id != localStorage.getItem('id'))
            this.users.push(element);
        });
      })
      .joining((user)=>
      {
        if(this.users.indexOf(user)==-1)
          this.users.push(user);
      })
      .leaving((user)=>
      {
        this.users.splice(this.users.indexOf(user))
      });
    
    
   window.Echo.channel('channel-name')
        .listen('.channelEvent', (data) => {
          console.log('From laravel echo: ', data);
        });
  }

  OdjaviSe()
  {

    this.userService.IzlogujSe().subscribe((resp: any) =>
    {
      console.log(resp);
      if(resp)
      {
        this.authService.logout();
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


  DajKorisnike()
  {

  }

}
