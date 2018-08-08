import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../servisi/auth.service';
import { UserServiceService } from '../../../servisi/user-service.service'
import swal from 'sweetalert2';
import Echo from 'laravel-echo';
import * as io from 'socket.io-client'
import { GameService } from '../../../servisi/game.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mec',
  templateUrl: './mec.component.html',
  styleUrls: ['./mec.component.css']
})
export class MecComponent implements OnInit {

  gameID:any;
  gameData:any;
  gameInfo:any;
  userX;
  userO;
  naPotezu="x";


  polja = [];


  constructor
  (
    private authService:AuthService,
    private userService:UserServiceService,
    private gameService:GameService,
    private router: Router,
  ) 
  { 
    window.io=io;

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
    window.Echo.connector.options.auth.headers['X-Socket-ID'] = 'Bearer ' + window.Echo.connector.socket.id;
    window.Echo.private(`game.`+this.gameID)
        .listen('NewTakeEvent', (e) => {
          console.log(e);
          this.polja[e.take.position-1]=e.take.symbol;
          if(e.take.symbol == 'x')
            this.naPotezu='o';
          else
            this.naPotezu='x';

        })
        .listen('NewGameOverEvent', (e) => {
          console.log(e);
          swal({
            type: 'info',
            title: 'Game over:',
            text: "Winner: "+e.game.winner,
            timer: 3000,
            background: 'black',
           /* backdrop: `
            rgba(0,0,123,0.4)
            url("")
            center left
            no-repeat
          `*/
          onClose:()=> this.router.navigate(['/igra'])
          })
          
        });

 
      

    this.gameService.GameInfo(this.gameID)
    .subscribe((resp: any) =>
    {
      //console.log(resp);
      if(resp)
      {
        this.gameInfo=resp;
        //console.log(this.gameInfo.data.user_x_id);
        this.userX=resp.data.user_x_id;
        this.userO=resp.data.user_o_id;
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
  
    this.setPolja();
    
  }

  ngOnInit() 
  {
    
    
  }


  setPolja()
  {
    for(let i=0;i<9;i++)
      this.polja[i]=' ';
  }

  makeMove(pozicija)
  {
    console.log(pozicija);
    this.gameService.odigraj(pozicija+1)
    .subscribe((resp: any) =>
    {
      console.log(resp);
      if(resp)
      {
        console.log(resp);
        this.polja[resp.data.position-1]=resp.data.symbol;
        if(resp.data.symbol == 'x')
          this.naPotezu='o';
        else
          this.naPotezu='x';

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



}
