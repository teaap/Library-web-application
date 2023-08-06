import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Knjiga } from '../models/knjige';
import { Rezervacija } from '../models/rezervacije';
import { Zaduzenje } from '../models/zaduzenja';
import { KnjigeService } from '../services/knjige.service';
import { RezervacijeServices } from '../services/rezervacije.service';
import { ZaduzenjaService } from '../services/zaduzenja.service';

@Component({
  selector: 'app-pocetna-modertor',
  templateUrl: './pocetna-moderator.component.html',
  styleUrls: ['./pocetna-moderator.component.css']
})
export class PocetnaModeratorComponent implements OnInit {

  constructor(private rezervserv:RezervacijeServices, private KnjigeService:KnjigeService,private sanitizer:DomSanitizer,private zaduzenjaservices:ZaduzenjaService) { }
  id:  Number;
  autor: string;
  godina:  string;
  izdavao:  string;
  jezik:  string;
  naziv: string;
  zanr:  string;
  broj:Number;
  book:Knjiga;
  allBooks:Knjiga[]
  slikadana:number
  status:string
  rokzadvadanaob:string;
  istekaorokob:string;
  isteko:string
  blokiranob:string;
  allActiveZaduzenja:Array<Zaduzenje>=[]
  dodatnaknjigaob:string;
  imatriknjigeob:string;
  zaduzeno:number
  knjigadva:string
  prihvacenzahtev:string;
  rezervisanaob:string;
  rezervisane:Array<Knjiga>=[]
  prihvacene:Array<Knjiga>=[]
  username:string
  ngOnInit(): void {
    this.rezervisane=[]
    this.rezervisanaob=""
    this.knjigadva=""
    this.prihvacenzahtev=""
    this.rokzadvadanaob="";
    this.istekaorokob="";
    this.blokiranob="";
    this.dodatnaknjigaob="";
    this.imatriknjigeob="";
    this.zaduzeno=Number(sessionStorage.getItem('zaduzeno'))
    if(this.zaduzeno>=3) this.imatriknjigeob="Zaduzili ste tri knjige"
    this.slikadana=Number(sessionStorage.getItem('slikadana'))
    this.username=sessionStorage.getItem('username')
    this.status=sessionStorage.getItem('blokiran')
    if(this.status=='blokiran') this.blokiranob="Korisnik je blokiran"
      this.KnjigeService.getallbookssort().subscribe((k:Knjiga[])=>{
        this.autor=k[this.slikadana].autor;
        this.naziv=k[this.slikadana].naziv;
        this.godina=k[this.slikadana].godina;
        this.jezik=k[this.slikadana].jezik;
        this.izdavao=k[this.slikadana].izdavac;
        this.zanr=k[this.slikadana].zanr;
        this.KnjigeService.getPictureOne(k[this.slikadana].id).subscribe((data)=>{
          let url=URL.createObjectURL(data)
          this.urll=this.sanitizer.bypassSecurityTrustUrl(url)
      })
    })
    this.rezervserv.getobavestenje(this.username).subscribe((rezv:Rezervacija[])=>{
      rezv.forEach((elem)=>{
        this.KnjigeService.getBookId(elem.idKnjige).subscribe((knjiga:Knjiga)=>{
          this.rezervisane.push(knjiga)
          this.rezervisanaob="Rezervisane knjige su dostupne: "
        })
        this.rezervserv.promeniobavesten(this.username,elem.idKnjige).subscribe(()=>{})
      })
    })
    this.zaduzenjaservices.findactiveusername(this.username).subscribe((reg:Array<Zaduzenje>)=>{
      this.allActiveZaduzenja=reg;
      reg.forEach((element) => {
          let danas=new Date();
          let newDate = new Date(element.datumDo)
          let danasvreme=danas.getTime()
          let newDatevreme=newDate.getTime()
          let ostalovreme=(danasvreme-newDatevreme)/(1000*3600*24)
          this.ostalo=Number(Math.floor(ostalovreme))
          
          if(this.ostalo>=2){
            this.rokzadvadanaob="Rok za razduzivanje knjige je u naredna dva dana";
            this.KnjigeService.getBookId(element.idKnjige).subscribe((r:Knjiga)=>{
              this.knjigadva=r.naziv
            })
          }
          if(this.ostalo>=0){
            this.istekaorokob="Rok za razduzivanje knjige je istekao";
            this.KnjigeService.getBookId(element.idKnjige).subscribe((r:Knjiga)=>{
              this.isteko=r.naziv
            })
          }
        })
        
      });
      this.KnjigeService.getknjigeusers(this.username).subscribe((knjige:Knjiga[])=>{
        this.prihvacene=knjige
        if(this.prihvacene.length>0)
        this.prihvacenzahtev="Zahtevi za sledece knjige su prihvaceni "
      })
    
  }
  ostalo:number
  slika:string;
  urll;

}
