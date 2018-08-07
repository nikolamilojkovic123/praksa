import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../servisi/auth.service';
import { UserServiceService } from '../../../servisi/user-service.service'
import swal from 'sweetalert2';
import Echo from 'laravel-echo';
import * as io from 'socket.io-client'
import { GameService } from '../../../servisi/game.service';

@Component({
  selector: 'app-mec',
  templateUrl: './mec.component.html',
  styleUrls: ['./mec.component.css']
})
export class MecComponent implements OnInit {

  gameID:any;

  constructor
  (
    private authService:AuthService,
    private userService:UserServiceService,
    private gameService:GameService,
  ) 
  { 
    window.io=io;
  }

  ngOnInit() 
  {
    this.gameID = window.location.pathname.split('/')[3];

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

    window.Echo.private(`challenge.`+this.gameID)
        .listen('NewGameEvent', (e) => {
          console.log(e);
          
        })

  }

}
