import { isPlatformWorkerApp } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../models/knjige';
import { Korisnik } from '../models/korisnici';
import { KnjigeService } from '../services/knjige.service';
import { KorisniciService } from '../services/korisnici.service';
import { ZahteviService } from '../services/zahtevi.service';

@Component({
  selector: 'app-pocetna-admin',
  templateUrl: './pocetna-admin.component.html',
  styleUrls: ['./pocetna-admin.component.css']
})
export class PocetnaAdminComponent implements OnInit {

  constructor(private KorisniciServices:KorisniciService,private KnjigeServices:KnjigeService,private route:Router,private zahteviServices:ZahteviService) { }

  allUsers:Korisnik[]=[]
  allBooks:Knjiga[]=[]
  message:string;
  zaduzenjee:number

  ngOnInit(): void {
    this.allUsers=[]
    this.allBooks=[]
    
    this.zaduzenje=Number(sessionStorage.getItem('zaduzenje'));
    this.zaduzenjee=this.zaduzenje
    this.KorisniciServices.getAllUsers().subscribe((data: Korisnik[])=>{
      this.allUsers = data;
      //this.allNews.sort() ok
    })
    this.KnjigeServices.getAllBooks().subscribe((data: Knjiga[])=>{
      this.allBooks = data;
      //this.allNews.sort() ok
    })
  }

  obrisiKnjigu(id){
    this.KnjigeServices.getBookId(id).subscribe((k:Knjiga)=>{
      if(Number(k.zaduzena>0)){
        this.message="Kjigu je neko zaduzio"
      }
      else{
        this.KnjigeServices.deleteknjiga(id).subscribe(()=>{
          this.ngOnInit()
        })
      }
    })
  }

  odbij(id){
    this.KnjigeServices.deleteknjiga(id).subscribe((req)=>{
      this.message=req['message'];
      this.zahteviServices.delete(id).subscribe((reg)=>{
        {this.ngOnInit()}
        
      })
    })

  }

  obrisiKorisnika(id,username){
    this.KorisniciServices.getUserUsername(username).subscribe((p:Korisnik)=>{
      if(Number(p.zaduzeno)>0) {
        
        this.message="Korisnik ima zaduzene knjige"
      }
      else{
        this.KorisniciServices.deletekorisnika(id).subscribe(()=>{
          this.message="Uspecno obrisano"
          this.ngOnInit()
        })
      }
    })
  }

  dodajKorisnika(){
    this.route.navigate(['registracija'])
    
  }
  odobri(id){
    this.KnjigeServices.updatebookstatus(id).subscribe((req)=>{
      this.message=req['message'];
      this.zahteviServices.delete(id).subscribe((reg)=>{
        {this.ngOnInit()}
        
      })
    })
  }

  dodajKnjigu(){
    this.route.navigate(['dodajknjigumod'])
  }
  korisnik:Korisnik
  azuriraj(username){
    this.KorisniciServices.getUserUsername(username).subscribe((data:Korisnik)=>{
        this.korisnik=data;
        sessionStorage.setItem('username',this.korisnik.username);
        sessionStorage.setItem('telefon',this.korisnik.telefon);
        sessionStorage.setItem('adresa',this.korisnik.adresa);
        sessionStorage.setItem('email',this.korisnik.email);
        sessionStorage.setItem('ime',this.korisnik.ime);
        sessionStorage.setItem('prezime',this.korisnik.prezime);
        sessionStorage.setItem('lozinka',this.korisnik.lozinka);
        sessionStorage.setItem('slika',this.korisnik.slika);
        sessionStorage.setItem('status',this.korisnik.status);
        sessionStorage.setItem('tip',this.korisnik.tip);
        sessionStorage.setItem('zaduzeno',String(this.korisnik.zaduzeno));
        sessionStorage.setItem('id',String(this.korisnik.id));
        this.route.navigate(['profil'])
    })
  }
  blokirajKorisnika(username){
    this.KorisniciServices.updateBlok(username).subscribe(resp=>{
      alert(resp['message'])
      this.ngOnInit();
    }) 
  }

  odblokirajKorisnika(username){
    this.KorisniciServices.updateOdBlok(username).subscribe(resp=>{
      alert(resp['message'])
      this.ngOnInit();
    }) 
  }
  updateumoder(username){
    this.KorisniciServices.updateUModer(username).subscribe(resp=>{
      alert(resp['message'])
      this.ngOnInit();
    }) 
  }
  updateucit(username){
    this.KorisniciServices.updateUCit(username).subscribe(resp=>{
      alert(resp['message'])
      this.ngOnInit();
    }) 
  }
  updateNovi(username){
    this.KorisniciServices.updateNovi(username).subscribe(resp=>{
      alert(resp['message'])
      this.ngOnInit();
    }) 
  }

  pronadjena:Knjiga
  azurirajKnjigu(id){
    this.KnjigeServices.searchBooksOneParam(id).subscribe((data: Knjiga)=>{
      this.pronadjena = data;
    sessionStorage.setItem('id',String(this.pronadjena.id));
    sessionStorage.setItem('autor',this.pronadjena.autor);
    sessionStorage.setItem('zanr',this.pronadjena.zanr);
    sessionStorage.setItem('godina',this.pronadjena.godina);
    sessionStorage.setItem('izdavao',this.pronadjena.izdavac);
    sessionStorage.setItem('jezik',this.pronadjena.jezik);
    sessionStorage.setItem('naziv',this.pronadjena.naziv);
    sessionStorage.setItem('slika',this.pronadjena.slika);
    sessionStorage.setItem('stanje',String(this.pronadjena.stanje));
      sessionStorage.setItem('vrsta','admin')
    this.route.navigate(['knjigamoder'])
    })
  }
  zaduzenje:number;
  promenazaduzenja(){
    this.zaduzenjee=this.zaduzenje
    sessionStorage.setItem('zaduzenje',String(this.zaduzenje));
    this.ngOnInit()
  }

}
