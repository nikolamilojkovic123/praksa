import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../servisi/auth.service';
import { UserServiceService } from '../../servisi/user-service.service'
import swal from 'sweetalert2';
import Echo from 'laravel-echo';
import * as io from 'socket.io-client'
import { GameService } from '../../servisi/game.service';
import { element } from '@angular/core/src/render3/instructions';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  @Output() afterLogout= new EventEmitter<boolean>()
  prijavljen:boolean=false;
  users = [];
  challanges = [];
  mecevi = [];
  poruka="";

  constructor
  (
    private authService:AuthService,
    private userService:UserServiceService,
    private gameService:GameService,
    private _scrollToService: ScrollToService,
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
    
      window.Echo.private(`user.${localStorage.getItem('id')}`)
      .listen('NewChallengeEvent', (e) => {
          this.challanges.push(e);
          //console.log(e);
      });
    
  
  }

  Izazovi(userID)
  {
    this.gameService.Izazovi(userID).subscribe((resp: any) =>
    {
     // console.log(resp);
      if(resp)
      {
        window.Echo.private(`challenge.`+resp.challenge_id)
        .listen('NewGameEvent', (e) => {
         // console.log(e);
          this.gameService.podaci=e;
          //console.log(e.game.id);
          window.location.replace(window.location.href+ '/mec/' +e.game.id);
        })
        .listen('NewChallengeDeclinedEvent',(e) =>
        {
          //console.log(e);
          swal({
            
            title: "Korisnik koga ste izazvali je odustao!",
            imageUrl:
            '../../../../assets/images/tuzan-smajli.jpg',
            imageWidth: 200,
            imageHeight: 200,
            timer: 8000,
          })
        });
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


  Prihvati(challengeID)
  {
    this.gameService.PrihvatiIzazov(challengeID).subscribe((resp: any) =>
    {
      //console.log(resp);
      if(resp)
      {
        this.gameService.podaci=resp;
        //console.log("id  " +resp.data.id);
        window.location.replace(window.location.href+ '/mec/' +resp.data.id);
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
    //console.log(challengeID);
  }

  Odbij(challangeID)
  { 
    
    var izbaci;
    for(var i=0;i<this.challanges.length;i++)
    {
      if(this.challanges[i].challenge_id == challangeID)
      {
        izbaci=this.challanges[i];
        break;
      }
    }

    this.challanges.splice(this.challanges.indexOf(izbaci));


    this.gameService.OdbijIzazov(challangeID).subscribe((resp: any) =>
    {
      //console.log(resp);
      if(resp)
      {
        
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


  OdjaviSe()
  {

    this.userService.IzlogujSe().subscribe((resp: any) =>
    {
      //console.log(resp);
      if(resp)
      {
        this.authService.logout();
        this.afterLogout.emit(true);
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

  VidiSkor(userID)
  {
    //console.log(userID);
    this.gameService.MedjusobniSkor(userID).subscribe((resp: any) =>
    {
      //console.log(resp.data);
      if(resp)
      {
        this.mecevi=resp.data;
        if(this.mecevi.length==0)
        {
          swal({
            type: 'info',
            title: 'Nemate nijedan odigran mec sa izabranim korisnikom!',
            timer: 3000,
          })
        }
        const config: ScrollToConfigOptions = {
          target: 'destination'
        };
     
        this._scrollToService.scrollTo(config);
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

  VidiDetaljeKorisnika(userID)
  {
    this.userService.DetaljiKorisnika(userID).subscribe((resp: any) =>
    {
      //console.log(resp.data);
      if(resp)
      {
        swal({
            
          html:
            '<h1 style="font-size: 250%;text-align:left;color: #073175">Ime:   '+resp.data.name+'<br>Email:   '+resp.data.email+'</h1>'
          
        })
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
  

  VidiSvojProfil()
  {
    this.userService.DetaljiProfila().subscribe((resp: any) =>
    {
     // console.log(resp.data);
      if(resp)
      {
        swal({
            
          html:
            '<h1 style="font-size: 250%;text-align:left;color: #073175">Ime:   '+resp.data.name+'<br>Email:   '+resp.data.email+'</h1>'
          
        })
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
