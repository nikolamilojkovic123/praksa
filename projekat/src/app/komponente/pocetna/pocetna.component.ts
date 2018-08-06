import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servisi/auth.service';
import { UserServiceService } from '../../servisi/user-service.service'
import swal from 'sweetalert2';
import Echo from 'laravel-echo';
import * as io from 'socket.io-client'

import { element } from '@angular/core/src/render3/instructions';



/*declare var Echo: any;







window.io = window.io;
window.Echo = window.Echo || {};
*/

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

    //gadja server
    
    /*let token = 'Bearer ' + localStorage.getItem('access_token');
    window.io = window.io;
    window.Echo = new Echo(
    {
      broadcaster: 'socket.io',
      host: 'http://tictactoe.local:6003',

        auth:
        {
          headers:
          {
            'Authorization': token
          }
        }
      });*/
        window.Echo = new Echo({
          broadcaster: 'socket.io',
          host: 'http://tictactoe.local:6003',
          auth:
          {
              headers:
              {
                  'Authorization':'Bearer ' + localStorage.getItem('access_token'),
              }
          }   
        });
    
        //window.Echo.connector.options.auth.headers['X-Socket-ID'] = 'Bearer ' + window.Echo.connector.socket.id;


    window.Echo.join('lobby')
      .here((users)=>
      {
        users.forEach(element =>
        {
          //if(element.id != localStorage.getItem('id'))
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
    
      window.Echo.private(`user.${localStorage.getItem('id')}`)
    .listen('NewChallengeEvent', (e) => {
        console.log(e);
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
