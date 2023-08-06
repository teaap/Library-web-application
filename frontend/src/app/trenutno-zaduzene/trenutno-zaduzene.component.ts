import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../models/knjige';
import { Zaduzenje } from '../models/zaduzenja';
import { KnjigeService } from '../services/knjige.service';
import { ZaduzenjaService } from '../services/zaduzenja.service';
import { DomSanitizer } from '@angular/platform-browser';
import { RezervacijeServices } from '../services/rezervacije.service';
import { KorisniciService } from '../services/korisnici.service';
import { Rezervacija } from '../models/rezervacije';
import { Korisnik } from '../models/korisnici';

@Component({
  selector: 'app-trenutno-zaduzene',
  templateUrl: './trenutno-zaduzene.component.html',
  styleUrls: ['./trenutno-zaduzene.component.css']
})
export class TrenutnoZaduzeneComponent implements OnInit {

  constructor(private rezvserv:RezervacijeServices,private korisniciserv:KorisniciService , private zaduzenjaservices:ZaduzenjaService,private knjigeservices:KnjigeService,private route:Router,private sanitizer:DomSanitizer) { }

  allBooks:Array<Knjiga>=[]
  allActiveZaduzenja:Array<Zaduzenje>=[]
  danas:Date
  ostalo:number
  username:string
 

  ngOnInit(): void {
    this.username=sessionStorage.getItem('username')
    this.status=sessionStorage.getItem('blokiran')
    this.allBooks=[]
    
    this.vrsta=sessionStorage.getItem('vrsta')
    this.allActiveZaduzenja=[]
    this.zaduzenjaservices.findactiveusername(this.username).subscribe((reg:Array<Zaduzenje>)=>{
      this.allActiveZaduzenja=reg;
      reg.forEach((element:Zaduzenje) => {
        this.knjigeservices.getBookId(element.idKnjige).subscribe((knjiga:Knjiga)=>{
          knjiga.datumOd=element.datumOd;
          knjiga.datumDo=element.datumDo;
          knjiga.username=element.username;
          knjiga.produzio=element.produzio;
          knjiga.istekorok=false;
          let danas=new Date();
          let newDate = new Date(knjiga.datumDo)
          let danasvreme=danas.getTime()
          let newDatevreme=newDate.getTime()
          let ostalovreme=(danasvreme-newDatevreme)/(1000*3600*24)
          this.ostalo=Number(Math.floor(ostalovreme))
          if(this.ostalo>=0){knjiga.istekorok=true;knjiga.message="Rok za razduzivanje knjige je istekao pre "+String(this.ostalo)+" dana";}
          else knjiga.message="Rok za razduzivanje knjige je za "+String(-this.ostalo)+" dana"
          knjiga.url=null
          this.knjigeservices.getPicture(knjiga.slika).subscribe((data)=>{
            let url=URL.createObjectURL(data)
            this.urll=this.sanitizer.bypassSecurityTrustUrl(url)
            knjiga.url=this.urll
          })
          this.allBooks.push(knjiga)
          this.postavljen=true
        })
        })
        
      });
  }
  postavljen:boolean
  vrsta:string;
  urll;
  knjiga(id){
    this.knjigeservices.getBookId(id).subscribe((k:Knjiga)=>{
      sessionStorage.setItem('autor',k.autor);
      sessionStorage.setItem('godina',k.godina);
      sessionStorage.setItem('izdavao',k.izdavac);
      sessionStorage.setItem('jezik',k.jezik);
      sessionStorage.setItem('naziv',k.naziv);
      sessionStorage.setItem('zanr',k.zanr);
      sessionStorage.setItem('slikaKnjiga',k.slika);
      sessionStorage.setItem('stanje',String(k.stanje));
    })
    sessionStorage.setItem('id',id);

    this.vrsta=sessionStorage.getItem('vrsta');
    if(this.vrsta=='citalac')
      this.route.navigate(['knjiga'])
    else if(this.vrsta=='moderator')
      this.route.navigate(['knjigamoder'])
  }
  pronadjena:Knjiga
  id:Number

  detalji(id){
    this.knjigeservices.getBookId(id).subscribe((data: Knjiga)=>{
      this.pronadjena = data;
      this.id=this.pronadjena.id;
    sessionStorage.setItem('id',id);
    sessionStorage.setItem('autor',this.pronadjena.autor);
    sessionStorage.setItem('zanr',this.pronadjena.zanr);
    sessionStorage.setItem('godina',this.pronadjena.godina);
    sessionStorage.setItem('izdavao',this.pronadjena.izdavac);
    sessionStorage.setItem('jezik',this.pronadjena.jezik);
    sessionStorage.setItem('naziv',this.pronadjena.naziv);
    sessionStorage.setItem('slikaKnjiga',this.pronadjena.slika);
    sessionStorage.setItem('stanje',String(this.pronadjena.stanje));
  
    if(this.vrsta=='citalac')
    this.route.navigate(['knjiga'])
    else
    this.route.navigate(['knjigamoder'])
    })
  }

  zaduzivanje:number;
  status:string
  produzi(id,username,datumDo){
    let newDate = new Date(datumDo)
    this.zaduzivanje=Number(sessionStorage.getItem('zaduzenje'));
    newDate.setDate(newDate.getDate()+this.zaduzivanje)
    this.zaduzenjaservices.updatezaduzenjaproduzi(id,username,newDate).subscribe((res)=>{this.ngOnInit()})
  }
  aktivan:boolean;
  datumOd:Date;
  datumDo:Date;
  produzio:boolean;
  zaduzenje:number;
  message:string;

  razduzi(id){
    this.zaduzenjaservices.updaterazduzi(id,this.username).subscribe(()=>{
      this.knjigeservices.razduziknjigu(id).subscribe(()=>{
        this.korisniciserv.updateKorisnikrazaduzenja(this.username).subscribe(()=>{
        this.rezvserv.getrezervacijaid(this.id).subscribe((rez:Rezervacija[])=>{
          rez.forEach((elem)=>{
            this.korisniciserv.getUserUsername(elem.username).subscribe((korisnik:Korisnik)=>{
              if(korisnik.zaduzeno<3){
                this.zaduzenjaservices.findactiveusername(elem.username).subscribe((zahtevi:Zaduzenje[])=>{
                  let i=0;
                  zahtevi.forEach((e)=>{
                    if(new Date(e.datumDo)<new Date())i++;
                  })
                  if(i==0){
                    this.aktivan=true;
                    this.produzio=false;
                    this.datumOd=new Date();
                    this.datumDo=new Date();
                    this.zaduzenje=Number(sessionStorage.getItem('zaduzenje'));
                    this.datumDo.setDate(this.datumOd.getDate()+this.zaduzenje);
                    this.knjigeservices.zaduziknjigu(this.id).subscribe(()=>{})
                    this.rezvserv.promeniaktivan(elem.username,this.id).subscribe(()=>{})
                    this.korisniciserv.updateKorisnikZaduzenja(elem.username).subscribe(()=>{})
                    this.zaduzenjaservices.dodajZaduzenje(this.id,this.username,this.datumOd,this.datumDo).subscribe(respObj=>{
                      if(respObj['message']=='Uspesno'){
                        console.log('ok');
                        this.message='Stanje je promenjeno, uspesno!';
                      }
                      else{
                        this.message='Greska!Pokusajte ponovo!';
                      } 
                      });     
                  }
                })
              }
            })
          })
        })
        this.ngOnInit()
      })
      })
    })
  }

}
