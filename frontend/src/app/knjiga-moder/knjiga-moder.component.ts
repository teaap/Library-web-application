import { Component, OnInit } from '@angular/core';
import { KnjigeService } from '../services/knjige.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Knjiga } from '../models/knjige';
import { KomentariService } from '../services/komentari.service';
import { Komentar } from '../models/komentari';
import { Router } from '@angular/router';
import { RezervacijeServices } from '../services/rezervacije.service';
import { Rezervacija } from '../models/rezervacije';
import { Zaduzenje } from '../models/zaduzenja';
import { ZaduzenjaService } from '../services/zaduzenja.service';
import { KorisniciService } from '../services/korisnici.service';
import { Korisnik } from '../models/korisnici';
import { ZahteviService } from '../services/zahtevi.service';
import { Zahtev } from '../models/zahtevi';
import { colorSets } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-knjiga-moder',
  templateUrl: './knjiga-moder.component.html',
  styleUrls: ['./knjiga-moder.component.css']
})
export class KnjigaModerComponent implements OnInit {

  constructor(private zaduzservices:ZaduzenjaService,private korisserv:KorisniciService,private route:Router,private zadserv:ZaduzenjaService,private rezervserv:RezervacijeServices,private KnjigeService:KnjigeService,private sanitizer:DomSanitizer,private KomentariServices:KomentariService) { }
  izdavao:string
  username:string
  vrsta:string
  status:string
  ocenaknjige:number
  registrovan:boolean
  ocenaforfor:number[]=[0,1,2,3,4,5,6,7,8,9]
  komentarisao:number

  izmeni(tekst,ocena){
    sessionStorage.setItem('tekst',tekst)
    sessionStorage.setItem('ocena',ocena)
    this.route.navigate(['izmenikomentar']);  
  }

  ngOnInit(): void {
    this.napravi();
    this.komentarisao=0
    this.KomentariServices.getkomentaridusername(this.id,this.username).subscribe((k:Komentar)=>{
      if(k) {
        this.komentarisao=1
      }
      else this.komentarisao=0
    })
    this.KnjigeService.getocenazaknjigu(this.id).subscribe((oc:number)=>{
      this.ocenaknjige=oc
    })
    
   

    this.status=sessionStorage.getItem('blokiran')
    this.registrovan=Boolean(sessionStorage.getItem('registrovan'))
    this.id=Number(sessionStorage.getItem('id'));
    this.KnjigeService.getBookId(this.id).subscribe((knjiga:Knjiga)=>{
      this.broj=knjiga.stanje;
    })
    
    this.KomentariServices.getkomentarid(this.id).subscribe((koms:Komentar[])=>{
      
      this.allKoments=koms;
        this.allKoments.sort((b1,b2)=>{
          if(b1.datum<b2.datum) return 1;
          else if(b1.datum==b2.datum) return 0;
          else return -1;
        })
    })
    console.log(this.id);
    this.image=null;
    this.KnjigeService.getPicture(this.slika).subscribe((data)=>{
      let url=URL.createObjectURL(data)
      this.urll=this.sanitizer.bypassSecurityTrustUrl(url)
    })
    
  }

  id:number;
  
  allKoments:Komentar[]=[]

  onFileChanged(event) {
    if (event.target.value) {
        this.image = event.target.files[0];
    }
      else this.image=null as any;
  }

  promeni:boolean;

  update()
  {
    if(this.nazivNew=="" || this.nazivNew==undefined) this.nazivNew=this.naziv;
    if(this.autorNew=="" || this.autorNew==undefined) this.autorNew=this.autor;
    if(this.zanrNew=="" || this.zanrNew==undefined) this.zanrNew=this.zanr;
    if(this.godinaNew=="" || this.godinaNew==undefined) this.godinaNew=this.godina;
    if(this.izdavacNew=="" || this.izdavacNew==undefined) this.izdavacNew=this.izdavao;
    if(this.jezikNew=="" || this.jezikNew==undefined) this.jezikNew=this.jezik;
    if(this.brojNew==undefined) this.brojNew=this.broj;
    else {
      this.promeni=true;}
    let formdata = new FormData();
      formdata.append('id', String(this.id));
      formdata.append('naziv', this.nazivNew);
      formdata.append('zanr', this.zanrNew);
      formdata.append('autor', this.autorNew);
      formdata.append('godina', this.godinaNew);
      formdata.append('izdavao', this.izdavacNew);
      formdata.append('jezik', this.jezikNew);
      formdata.append('broj', String(this.brojNew));
      if(this.promeni==true){
        this.rezervserv.getrezervacijaid(this.id).subscribe((rez:Rezervacija[])=>{
          rez.forEach((elem)=>{
            this.korisserv.getUserUsername(elem.username).subscribe((korisnik:Korisnik)=>{
              if(korisnik.status!='blokiran'){
              if(korisnik.zaduzeno<3){
                this.zaduzservices.findactiveusername(elem.username).subscribe((zahtevi:Zaduzenje[])=>{
                  let i=0;
                  zahtevi.forEach((e)=>{
                    if(new Date(e.datumDo)<new Date())i++;
                    if(i==0){
                      this.aktivan=true;
                      this.produzio=false;
                      this.datumOd=new Date();
                      this.datumDo=new Date();
                      this.zaduzenje=Number(sessionStorage.getItem('zaduzenje'));
                      this.datumDo.setDate(this.datumOd.getDate()+this.zaduzenje);
                      this.KnjigeService.zaduziknjigu(this.id).subscribe(()=>{})
                      this.rezervserv.promeniaktivan(elem.username,this.id).subscribe(()=>{})
                      this.korisserv.updateKorisnikZaduzenja(elem.username).subscribe(()=>{})
                      this.zaduzservices.dodajZaduzenje(this.id,this.username,this.datumOd,this.datumDo).subscribe(respObj=>{
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
                  
                })
              }
            }
            })
          })
        })
      }

      if (this.image != null) {
        formdata.append('slika', this.image, this.image.name);
        this.KnjigeService.updateKnjiga(formdata).subscribe((resp) => {
          this.message=resp['message'];
          this.KnjigeService.getBookId(this.id).subscribe((resp:Knjiga)=>{
            sessionStorage.removeItem('slikaKnjiga')
            sessionStorage.setItem('slikaKnjiga',resp.slika);
            sessionStorage.setItem('autor',this.autorNew)
            sessionStorage.setItem('zanr', this.zanrNew);
            sessionStorage.setItem('godina',this.godinaNew)
            sessionStorage.setItem('izdavao',this.izdavacNew)
            sessionStorage.setItem('jezik',this.jezikNew)
            sessionStorage.setItem('broj',String(this.brojNew))
            
            this.ngOnInit()
          })
          
        })
      }
      else {
        this.KnjigeService.updateKnjigaSlika(formdata).subscribe((resp) => {
            this.message=resp['message'];
            this.KnjigeService.getBookId(this.id).subscribe((resp:Knjiga)=>{
              sessionStorage.setItem('naziv',this.nazivNew)
              sessionStorage.setItem('zanr', this.zanrNew);
              sessionStorage.setItem('autor',this.autorNew)
              sessionStorage.setItem('godina',this.godinaNew)
              sessionStorage.setItem('izdavao',this.izdavacNew)
              sessionStorage.setItem('jezik',this.jezikNew)
              sessionStorage.setItem('broj',String(this.brojNew))

              this.ngOnInit()
            })         
        });
      }
    
  }

  dodajkomentar(){
    this.route.navigate(['dodajkomentar'])
  }
    
  message:string;
  naziv:string;
  autor:string;
  jezik:string;
  zanr:string;
  izdavac:string;
  godina:string;
  broj:number;
  brojNew:number;
  nazivNew:string;
  autorNew:string;
  jezikNew:string;
  zanrNew:string;
  izdavacNew:string;
  godinaNew:string;
  slika:string;
  image:File;
  urll;

  napravi()
  {
    this.vrsta=sessionStorage.getItem('vrsta');
    this.id=Number(sessionStorage.getItem('id'));
    this.autor=sessionStorage.getItem('autor');
    this.godina=sessionStorage.getItem('godina');
    this.izdavao=sessionStorage.getItem('izdavao');
    this.jezik=sessionStorage.getItem('jezik');

    this.naziv=sessionStorage.getItem('naziv');
    this.zanr=sessionStorage.getItem('zanr');
    this.slika=sessionStorage.getItem('slikaKnjiga');
    this.username=sessionStorage.getItem('username');
   
    this.broj=Number(sessionStorage.getItem('broj'));
    this.urll=null as any;
  }
  aktivan:boolean;
  datumOd:Date;
  datumDo:Date;
  produzio:boolean;
  zaduzenje:number;
  zaduziKnjigu(){
    this.username=sessionStorage.getItem('username');
    
    this.zadserv.findactiveidusername(this.id,this.username).subscribe((r:Zaduzenje)=>{
    if(r==null){
      this.KnjigeService.getBookId(this.id).subscribe((knjiga:Knjiga)=>{})
    this.korisserv.updateKorisnikZaduzenja(this.username).subscribe((resp:string)=>{
      if(resp['message']=='ima3') {this.message='Ne mozete zaduziti vise od tri knjige!';}
      else if(resp['message']=='updated') {
        this.aktivan=true;
        this.produzio=false;
        this.datumOd=new Date();
        this.datumDo=new Date();
        this.zaduzenje=Number(sessionStorage.getItem('zaduzenje'));
        this.datumDo.setDate(this.datumOd.getDate()+this.zaduzenje);
        this.KnjigeService.zaduziknjigu(this.id).subscribe(()=>{})
        this.zadserv.dodajZaduzenje(this.id,this.username,this.datumOd,this.datumDo).subscribe(respObj=>{
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
      else this.message="Ovu knjigu ste vec zaduzili"
      }
    )}
  rezervisiKnjigu(){
    this.zadserv.findactiveidusername(this.id,this.username).subscribe((r:Zaduzenje)=>{
      if(r==null){
        this.rezervserv.getrezervacija(this.username,this.id).subscribe((rez:Rezervacija)=>{
          if(rez!=null) this.message="Vec ste rezervisali knjigu"
          else{
            this.KnjigeService.getBookId(this.id).subscribe((knjiga:Knjiga)=>{
              if(knjiga.stanje==0){
                this.rezervserv.dodajrezervaciju(this.username,this.id).subscribe((res)=>{
                  alert(res['message'])
                })
              }})
          }

        })
        }
        else{this.message="Vec ste zaduzili knjigu"}
        })
  }

}
