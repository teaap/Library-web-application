import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnici';
import { KorisniciService } from '../services/korisnici.service';
import { DomSanitizer } from '@angular/platform-browser';
import { KnjigeService } from '../services/knjige.service';
import { ZaduzenjaService } from '../services/zaduzenja.service';
import { Knjiga } from '../models/knjige';
import { Zaduzenje } from '../models/zaduzenja';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private KorisniciService:KorisniciService,private sanitizer:DomSanitizer,private knjiges:KnjigeService,private zaduzenjaservices:ZaduzenjaService) { }

  saleData;
  saleData1;
  zanrovi:Array<String>=[]
  trenutniMesec:number
  trenutnaGodina:number
  adresaneispravna:string
  adresap(){
    let proba=/^[A-Z][a-zA-Z ]+ \d{1,3}, [A-Z][a-zA-Z ]+$/
    if(proba.test(this.adresaNew)){
      this.adresaneispravna=""
    }
    else {
      this.adresaneispravna="Adresa je neispravna"
      
    }
   }

  ngOnInit(): void {
    this.adresaneispravna=""
    this.izbroj=[0,0,0,0,0,0,0,0,0,0,0,0]
    this.izbroj1=[0,0,0,0,0,0,0,0,0,0,0,0]
    this.trenutniMesec=new Date().getMonth()
    this.trenutnaGodina=new Date().getFullYear()
    this.username=sessionStorage.getItem('username')
    this.zaduzenjaservices.findnoactiveusername(this.username).subscribe((k:Zaduzenje[])=>{
      
      k.forEach((elem)=>{
        this.knjiges.getBookId(elem.idKnjige).subscribe((knj:Knjiga)=>{
          if(new Date(elem.datumOd).getFullYear()==this.trenutnaGodina && new Date(elem.datumDo).getFullYear()==this.trenutnaGodina){
            this.izbroj1[new Date(elem.datumDo).getMonth()]++;
          } 
          else if(new Date(elem.datumOd).getMonth()>=this.trenutniMesec && new Date(elem.datumDo).getTime()<=new Date().getTime() && new Date(elem.datumOd).getFullYear()==this.trenutnaGodina-1) {
            this.izbroj1[new Date(elem.datumDo).getMonth()]++;

          }

          while(1)
          {
            cao=knj.zanr.substring(pros,pros+knj.zanr.length).indexOf(",")
            if(cao==-1) break
              this.zanrovi.push(knj.zanr.substring(pros,pros+cao))
              pros=pros+cao+1
              console.log(this.zanrovi[this.zanrovi.length-1])
          }
          this.zanrovi.push(knj.zanr.substring(pros,pros+knj.zanr.length))
          console.log(this.zanrovi[this.zanrovi.length-1])
          this.prebroj()
          this.zanrovi=[]
          cao=0
          pros=0
          this.saleData = [
            { name: "drama", value:this.izbroj[0] },
            { name: "triler", value:this.izbroj[1] },
            { name: "ljubavni", value: this.izbroj[2] },
            { name: "klasici", value: this.izbroj[3] },
            { name: "komedija", value: this.izbroj[4] },
            { name: "psihologija", value: this.izbroj[5] },
            { name: "filozofija", value: this.izbroj[6] },
            { name: "naucna fantastika", value: this.izbroj[7]},
            { name: "istorija", value: this.izbroj[8] }
          ];
          this.saleData1 = [
            { name: "januar", value:this.izbroj1[0] },
            { name: "februar", value:this.izbroj1[1] },
            { name: "mart", value: this.izbroj1[2] },
            { name: "april", value: this.izbroj1[3] },
            { name: "maj", value: this.izbroj1[4] },
            { name: "jun", value: this.izbroj1[5] },
            { name: "jul", value: this.izbroj1[6] },
            { name: "avgust", value: this.izbroj1[7]},
            { name: "septembar", value: this.izbroj1[8] },
            { name: "oktobar", value: this.izbroj1[9] },
            { name: "novembar", value: this.izbroj1[10] },
            { name: "decembar", value: this.izbroj1[11] }
          ];
        })
        
      })
      
    })
    this.napravi();
    this.registrovan=Boolean(sessionStorage.getItem('registrovan'))
    this.status=sessionStorage.getItem('blokiran')
    this.vrsta=sessionStorage.getItem('vrsta');
    this.id=Number(sessionStorage.getItem('id'));
    this.image=null;
    this.KorisniciService.getPicture(this.slika).subscribe((data)=>{
      let url=URL.createObjectURL(data)
      this.urll=this.sanitizer.bypassSecurityTrustUrl(url)
    })
    let cao=0
    let pros=0
    this.zanrovi=[]

   
   
  }
  izbroj1:number[]=[0,0,0,0,0,0,0,0,0,0,0,0]
  
  searchzanr:Array<String>=[]
  vrsta:string;
  id:number;
  status:string
  registrovan:boolean
  izbroj:number[]=[0,0,0,0,0,0,0,0,0,0,0,0]
  prebroj1(){}

  prebroj(){
    this.zanrovi.forEach((elem)=>{
      switch(elem){
        case 'drama':{
          this.izbroj[0]++;
          break;
        }
        case 'triler':{
          this.izbroj[1]++;break;
        }
        case 'ljubavni':{
          this.izbroj[2]++;break;
        }
        case 'klasici':{
          this.izbroj[3]++;break;
        }
        case 'komedija':{
          this.izbroj[4]++;break;
        }
        case 'psihologija':{
          this.izbroj[5]++;break;
        }case 'filozofija':{
          this.izbroj[6]++;break;
        }case 'naucna fantastika':{
          this.izbroj[7]++;break;
        }
        case 'istorija':{
          this.izbroj[8]++;break;
        }
      }
    })
  }

  onFileChanged(event) {
    if (event.target.value) {
        this.image = event.target.files[0];
    }
      else this.image=null as any;
  }

  update()
  {
    if(this.prezimeNew=="" || this.prezimeNew==undefined) this.prezimeNew=this.prezime;
    if(this.adresaNew=="" || this.adresaNew==undefined) this.adresaNew=this.adresa;
    if(this.telefonNew=="" || this.telefonNew==undefined) this.telefonNew=this.telefon;
    if(this.emailNew=="" || this.emailNew==undefined) this.emailNew=this.email;
    if(this.usernameNew=="" || this.usernameNew==undefined) this.usernameNew=this.username;
    if(this.imeNew=="" || this.imeNew==undefined) this.imeNew=this.ime;
    let formdata = new FormData();
      formdata.append('id', String(this.id));
      formdata.append('username', this.usernameNew);
      formdata.append('email', this.emailNew);
      formdata.append('telefon', this.telefonNew);
      formdata.append('ime', this.imeNew);
      formdata.append('prezime', this.prezimeNew);
      formdata.append('adresa', this.adresaNew);

      if (this.image != null) {
        formdata.append('slika', this.image, this.image.name);
        this.KorisniciService.updateKorisnik(formdata).subscribe((resp) => {
          this.message=resp['message'];
          this.KorisniciService.getUserUsername(this.username).subscribe((resp:Korisnik)=>{
            sessionStorage.setItem('slika',resp.slika);
            sessionStorage.setItem('username',this.usernameNew)
            sessionStorage.setItem('adresa',this.adresaNew)
            sessionStorage.setItem('ime',this.imeNew)
            sessionStorage.setItem('prezime',this.prezimeNew)
            sessionStorage.setItem('email',this.emailNew)
            sessionStorage.setItem('telefon',this.telefonNew)
            sessionStorage.setItem('username',this.usernameNew)
            this.ngOnInit()
          })
          
        })
      }
      else {
        this.KorisniciService.updateKorisnikSlika(formdata).subscribe((resp) => {
            this.message=resp['message'];
            this.KorisniciService.getUserUsername(this.username).subscribe((resp:Korisnik)=>{
              sessionStorage.setItem('username',this.usernameNew)
              sessionStorage.setItem('adresa',this.adresaNew)
              sessionStorage.setItem('ime',this.imeNew)
              sessionStorage.setItem('prezime',this.prezimeNew)
              sessionStorage.setItem('email',this.emailNew)
              sessionStorage.setItem('telefon',this.telefonNew)
              sessionStorage.setItem('username',this.usernameNew)
              this.ngOnInit()
            })
            
          
        });
      }
    
  }
    
  message:string;
  ime:string;
  prezime:string;
  username:string;
  adresa:string;
  telefon:string;
  email:string;
  imeNew:string;
  prezimeNew:string;
  usernameNew:string;
  adresaNew:string;
  telefonNew:string;
  emailNew:string;
  slika1:string;
  slika:string;
  image:File;
  urll;

  napravi()
  {
    this.username=sessionStorage.getItem('username');
    this.ime=sessionStorage.getItem('ime');
    this.prezime=sessionStorage.getItem('prezime');
    this.adresa=sessionStorage.getItem('adresa');
    this.email=sessionStorage.getItem('email');
    this.telefon=sessionStorage.getItem('telefon');
    this.slika=sessionStorage.getItem('slika');
    this.urll=null as any;
  }
}
