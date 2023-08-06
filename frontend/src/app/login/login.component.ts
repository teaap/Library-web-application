import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnici';
import { KorisniciService } from '../services/korisnici.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private KorisniciServices:KorisniciService,private router: Router) { }

  ngOnInit(): void {
  }
  username:string="";
  lozinka:string="";
  message:string;
  stavi:boolean;
  registrovan:boolean

  login(){
    this.registrovan=true
    sessionStorage.setItem('registrovan',String(this.registrovan));
    
    if(this.username=="" || this.lozinka=="") {this.stavi=true;this.message="Unesite sva polja."}
    else{
    this.KorisniciServices.login(this.username, this.lozinka).subscribe((userFromDB: Korisnik)=>{
      this.stavi=true;
      if(userFromDB!=null){
        sessionStorage.setItem('blokiran',userFromDB.status)
        sessionStorage.setItem('username',userFromDB.username);
        sessionStorage.setItem('ime',userFromDB.ime);
        sessionStorage.setItem('prezime',userFromDB.prezime);
        sessionStorage.setItem('adresa',userFromDB.adresa);
        sessionStorage.setItem('telefon',userFromDB.telefon);
        sessionStorage.setItem('slika',userFromDB.slika);
        sessionStorage.setItem('email',userFromDB.email);
        sessionStorage.setItem('zaduzeno',String(userFromDB.zaduzeno));
        if(userFromDB.tip=="citalac"){
          sessionStorage.setItem('vrsta','citalac')
          this.router.navigate(['citalac']);
        }
        else if(userFromDB.tip=="moderator"){
          sessionStorage.setItem('vrsta','moderator')
          this.router.navigate(['moderator']);
        }
        else{
          sessionStorage.setItem('vrsta','administrator')
          this.router.navigate(['administrator']);
        }
      }
      else{
        this.message="Ne postoji korisnik"
      }
    })
    
  }
}
}
