import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisniciService } from '../services/korisnici.service';

@Component({
  selector: 'app-lozinka',
  templateUrl: './lozinka.component.html',
  styleUrls: ['./lozinka.component.css']
})
export class LozinkaComponent implements OnInit {

  constructor(private KorisniciServices:KorisniciService,private router: Router) { }
  vrsta:string;
  duplalozinka:string;
  neispravnalozinka:string;

  ngOnInit(): void {
    this.vrsta=sessionStorage.getItem('vrsta');
    this.username=sessionStorage.getItem('username');
  }
  lozinkap(prov){
    let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,12}$/;
    if(pattern.test(prov)){
      this.neispravnalozinka=""
    }
    else {
      this.neispravnalozinka="Lozinka je nevalidna"
      
    }
   }
   lozinkad(n){
    if(this.nova1!=this.nova2) this.duplalozinka="Lozinke moraju da se poklapaju"
    else this.duplalozinka=""
   }
  nova1:string;
  nova2:string;
  stara:string;
  message:string;
  stavi:boolean;
  username:string;
  promeni(){
    this.KorisniciServices.dohvatiKorisnika(this.username,this.stara).subscribe((resp:string)=>{
      this.message=resp;
      if(this.message=='Pronadjen'){
        this.KorisniciServices.promeniLozinku(this.username,this.nova1).subscribe(resp=>{
          this.message='Lozinka je uspesno promenjena';
          this.router.navigate(['login'])
        }) 
      }
      else{
        this.stavi=true;
        this.message='Neispravna stara lozinka';
      }
    })
  }

}
  

