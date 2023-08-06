import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../services/knjige.service';
import { DomSanitizer } from '@angular/platform-browser';
import { KorisniciService } from '../services/korisnici.service';
import { ZaduzenjaService } from '../services/zaduzenja.service';
import { KomentariService } from '../services/komentari.service';
import { Komentar } from '../models/komentari';
import { Zaduzenje } from '../models/zaduzenja';
import { Knjiga } from '../models/knjige';
import { RezervacijeServices } from '../services/rezervacije.service';
import { Rezervacija } from '../models/rezervacije';

@Component({
  selector: 'app-knjiga',
  templateUrl: './knjiga.component.html',
  styleUrls: ['./knjiga.component.css']
})
export class KnjigaComponent implements OnInit {

  registrovan:boolean

  constructor(private rezervservices:RezervacijeServices,private KomentariServices:KomentariService,private KnjigaServices:KnjigeService,private ZaduzenjeServices:ZaduzenjaService,private KorisnikServices:KorisniciService,private sanitizer:DomSanitizer,private route:Router) { }

  username:string;
  allKoments:Komentar[]=[]
  kom:Komentar
  stanje:string
  status:string
  vrsta:string
  ocenaknjige:number
  komentarisao:number
  stanjeknjige:boolean
  ocenaforfor:number[]=[0,1,2,3,4,5,6,7,8,9]
  ngOnInit(): void {
    this.message=""
    this.komentarisao=0
    this.status=sessionStorage.getItem('blokiran')
    this.registrovan=Boolean(sessionStorage.getItem('registrovan'))
    this.id=Number(sessionStorage.getItem('id'));
    this.autor=sessionStorage.getItem('autor');
    this.stanje=sessionStorage.getItem('stanje')
    this.godina=sessionStorage.getItem('godina');
    this.izdavao=sessionStorage.getItem('izdavao');
    this.jezik=sessionStorage.getItem('jezik');
    this.naziv=sessionStorage.getItem('naziv');
    this.zanr=sessionStorage.getItem('zanr');
    this.slika=sessionStorage.getItem('slikaKnjiga');
    this.username=sessionStorage.getItem('username');
    if (sessionStorage.getItem('vrsta')) this.vrsta=sessionStorage.getItem('vrsta')
    else this.vrsta=""
    this.KomentariServices.getkomentaridusername(this.id,this.username).subscribe((num:Komentar)=>{
      if(num) this.komentarisao=1
      else this.komentarisao=0
    })
   
    this.KnjigaServices.getBookId(this.id).subscribe((knjiga:Knjiga)=>{
        this.broj=knjiga.stanje;
      })
    
    this.KnjigaServices.getocenazaknjigu(this.id).subscribe((oc:number)=>{this.ocenaknjige=oc})
    this.KomentariServices.getkomentarid(this.id).subscribe((koms:Komentar[])=>{
      this.allKoments=koms;
        this.allKoments.sort((b1,b2)=>{
          if(b1.datum<b2.datum) return 1;
          else if(b1.datum==b2.datum) return 0;
          else return -1;
        })   
    })
    if(this.registrovan){
    this.KomentariServices.getkomentaridusername(this.id,this.username).subscribe((req:Komentar)=>{
      this.kom=req;
    })
    }
    this.KnjigaServices.getPicture(this.slika).subscribe((data)=>{
      let url=URL.createObjectURL(data)
      this.urll=this.sanitizer.bypassSecurityTrustUrl(url)
    })
  }
  id:  Number;
  autor: string;
  godina:  string;
  izdavao:  string;
  jezik:  string;
  naziv: string;
  zanr:  string;
  slika: string;
  broj:number;
  urll;
  message:string;
  aktivan:boolean;
  datumOd:Date;
  datumDo:Date;
  produzio:boolean;
  zaduzenje:number;

  rezervisiKnjigu(){
    this.ZaduzenjeServices.findactiveidusername(this.id,this.username).subscribe((r:Zaduzenje)=>{
      if(r==null){
        this.rezervservices.getrezervacija(this.username,this.id).subscribe((rez:Rezervacija)=>{
          if(rez!=null) this.message="Vec ste rezervisali knjigu"
          else{
            this.KnjigaServices.getBookId(this.id).subscribe((knjiga:Knjiga)=>{
              if(knjiga.stanje==0){
                this.rezervservices.dodajrezervaciju(this.username,this.id).subscribe((res)=>{
                  alert(res['message'])
                })
              }})
          }

        })
        }
        else{this.message="Vec ste zaduzili knjigu"}
        })
  }

  izmeni(tekst,ocena){
    sessionStorage.setItem('tekst',tekst)
    sessionStorage.setItem('ocena',ocena)
    this.route.navigate(['izmenikomentar']);
    
  }

  dodajkomentar(){
    this.route.navigate(['dodajkomentar'])
  }

  zaduziKnjigu(){
    this.username=sessionStorage.getItem('username');
    this.ZaduzenjeServices.findactiveidusername(this.id,this.username).subscribe((r:Zaduzenje)=>{
    if(r==null){
      this.KnjigaServices.getBookId(this.id).subscribe((knjiga:Knjiga)=>{})
    this.KorisnikServices.updateKorisnikZaduzenja(this.username).subscribe((resp:string)=>{
      if(resp['message']=='ima3') {this.message='Ne mozete zaduziti vise od tri knjige!';}
      else if(resp['message']=='updated') {
        this.aktivan=true;
        this.produzio=false;
        this.datumOd=new Date();
        this.datumDo=new Date();
        this.zaduzenje=Number(sessionStorage.getItem('zaduzenje'));
        this.datumDo.setDate(this.datumOd.getDate()+this.zaduzenje);
        this.KnjigaServices.zaduziknjigu(this.id).subscribe(()=>{})
        this.ZaduzenjeServices.dodajZaduzenje(this.id,this.username,this.datumOd,this.datumDo).subscribe(respObj=>{
          if(respObj['message']=='Uspesno'){
            this.message='Zaduzili ste  knjigu, uspesno!';
          }
          else{
            this.message='Greska!Pokusajte ponovo!';
          } 
          });     
        }
        
      }) 
      
      }
      else this.message="Vec ste zaduzili ovu knjigu"
      }
    )}
}
