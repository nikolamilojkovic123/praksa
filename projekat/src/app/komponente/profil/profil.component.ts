import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserServiceService } from '../../servisi/user-service.service';
import swal from 'sweetalert2'
import { AuthService } from '../../servisi/auth.service';
import { Router } from '@angular/router';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  sviMecevi=[];
  podaci;
  @Output() afterLogout= new EventEmitter<boolean>()
  prijavljen:boolean=false;
  userID;
  chartSve:any;


  constructor
  (
    private userService: UserServiceService,
    private authService:AuthService,
    private router: Router,
  ) 
  { }

  ngOnInit() {


    this.userID = window.location.pathname.split('/')[2];
    //console.log(this.userID);
    if(this.userID==localStorage.getItem('id'))
    {
      this.VidiSvojeDetalje();
      
    }  
    else
    { 
      this.VidiDetaljeKorisnika(this.userID);
      
    }
    
    
  }



  VidiSvojProfil()
  {
    let id=localStorage.getItem('id');
    this.router.navigate(['/profil/'+id]);
    /*this.userService.DetaljiProfila().subscribe((resp: any) =>
    {
     // console.log(resp.data);
      if(resp)
      {
        this.podaci=resp.data;
      }
    },
    error=>{
      console.log("Error: "+error.error.message);
      swal({
        type: 'error',
        title: 'Oops...',
        text: error.error.message,
        timer: 2000,
        onClose:()=> this.router.navigate(['/igra']),
      })
      
    });*/
  }
  
  VidiSvojeDetalje()
  {
    this.userService.DetaljiProfila().subscribe((resp: any) =>
    {
      //console.log(resp.data);
      if(resp)
      {
        this.podaci=resp.data;
        this.DajSveMojeMeceve();
      }
    },
    error=>{
      console.log("Error: "+error.error.message);
      swal({
        type: 'error',
        title: 'Oops...',
        text: error.error.message,
        timer: 2000,
        onClose:()=> this.router.navigate(['/igra']),
      })
      
    });
  }

  VidiDetaljeKorisnika(userID)
  {
    this.userService.DetaljiKorisnika(this.userID).subscribe((resp: any) =>
    {
      //console.log(resp.data);
      if(resp)
      {
        this.podaci=resp.data;
        this.DajSveMeceve(this.userID);
      }
    },
    error=>{
      console.log("Error: "+error.error.message);
      swal({
        type: 'error',
        title: 'Oops...',
        text: error.error.message,
        timer: 2000,
        onClose:()=> this.router.navigate(['/igra'])
        
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



  DajSveMeceve(userID)
  {
    this.userService.dajSveMeceve(userID).subscribe((resp: any) =>
    {
      console.log(resp);
      if(resp)
      {
        this.sviMecevi=resp.data;
        this.NapraviChart();
      }
    },
    error=>{
      console.log("Error: "+error.error.message);
      swal({
        type: 'error',
        title: 'Oops...',
        text: error.error.message,
        timer:3000,
      })
      
    });
  }

  DajSveMojeMeceve()
  {
    this.userService.dajSveMojeMeceve().subscribe((resp: any) =>
    {
      //console.log(resp);
      if(resp)
      {
        this.sviMecevi=resp.data;
        this.NapraviChart();
      }
    },
    error=>{
      console.log("Error: "+error.error.message);
      swal({
        type: 'error',
        title: 'Oops...',
        text: error.error.message,
        timer:3000,
      })
      
    });
  }




  NapraviChart()
  {
    let pobede=0;
    let porazi =0;
    let nereseno = 0;
    console.log(this.podaci);
    for(let i=0;i<this.sviMecevi.length;i++)
    {
      if(this.sviMecevi[i].winner=='Draw')
        nereseno++;
      else if(this.sviMecevi[i].winner==this.podaci.name)
        pobede++;
      else
        porazi++;
    }

    this.chartSve = new Chart({
      chart: {
        type: 'pie',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        backgroundColor: 'transparent',
      },
      title: {
        text: "Pobede porazi nereseno",
        style: {
          color: '#073175',
          fontWeight: 'bold',
          fontSize: '180%'
        }
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        //name: this.text._535,
        
        data: [{
          name: "Pobede",
          y: pobede,
          sliced: true,
          selected: true
        }, {
          name: "Porazi",
          y: porazi
        }, {
          name: "Nereseno",
          y: nereseno
        }]
      }]
      
    });
  }



}
