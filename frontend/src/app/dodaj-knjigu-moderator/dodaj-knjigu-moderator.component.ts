import { Component, OnInit } from '@angular/core';
import { Knjiga } from '../models/knjige';
import { KnjigeService } from '../services/knjige.service';
import { ZahteviService } from '../services/zahtevi.service';

@Component({
  selector: 'app-dodaj-knjigu-moderator',
  templateUrl: './dodaj-knjigu-moderator.component.html',
  styleUrls: ['./dodaj-knjigu-moderator.component.css']
})
export class DodajKnjiguModeratorComponent implements OnInit {

  constructor(private KnjigeService:KnjigeService,private zahteviServices:ZahteviService) { }

  ngOnInit(): void {
    this.autor=""
    this.godina=""
    this.izdavao=""
    this.jezik=""
    this.zanr=""
    this.naziv=""
    this.message=""
    this.username=sessionStorage.getItem('username');
  }

  autor: string;
  godina:  string;
  izdavao:  string;
  jezik:  string;
  naziv: string;
  zanr:  string;
  slika: File;
  image:File;
  message:string;
  stavi:boolean;
  id:number;
  username:string;

  dodajKnjigu(){
    if(this.autor=="" || this.godina=="" || this.izdavao=="" || this.jezik=="" || this.zanr=="" || this.naziv=="" ||
    this.autor==undefined || this.godina==undefined || this.izdavao==undefined || this.jezik==undefined || this.zanr==undefined || this.naziv==undefined)
    this.message="Unesite sva polja"
    else{
    let formdata = new FormData();
    formdata.append('autor', this.autor);
    formdata.append('godina', this.godina);
    formdata.append('izdavao', this.izdavao);
    formdata.append('jezik', this.jezik);
    formdata.append('naziv', this.naziv);
    formdata.append('zanr', this.zanr);
    let novi=0;
    this.KnjigeService.idposlednje().subscribe((r:Knjiga)=>{
      novi=Number(Number(r.id)+1)
      formdata.append('id', String(novi));
      if (this.image != null) {
        formdata.append('slika', this.image, this.image.name);
        this.KnjigeService.dodajKnjigu(formdata).subscribe((resp) => {
          this.message="Knjiga je uspesno dodata";
            this.stavi=true;
            this.autor=""
            this.godina=""
            this.izdavao=""
            this.jezik=""
            this.zanr=""
            this.naziv=""
        })
      }
      else {
        this.KnjigeService.dodajKnjiguSlika(formdata).subscribe((resp) => {
            this.message="Knjiga je uspesno dodata"
            this.autor=""
            this.godina=""
            this.izdavao=""
            this.jezik=""
            this.zanr=""
            this.naziv=""
          
        });
      }
    })
  }
    
    
  }
  onFileChanged(event) {
    if (!event.target.value) {
      this.image = null as any;     
      } 
    else {
      this.image = event.target.files[0];
    }
  }

  dodajZahtev(){
    if(this.autor=="" || this.godina=="" || this.izdavao=="" || this.jezik=="" || this.zanr=="" || this.naziv=="" ||
    this.autor==undefined || this.godina==undefined || this.izdavao==undefined || this.jezik==undefined || this.zanr==undefined || this.naziv==undefined)
    this.message="Unesite sva polja"
    else{
    let formdata = new FormData();
    formdata.append('autor', this.autor);
    formdata.append('godina', this.godina);
    formdata.append('izdavao', this.izdavao);
    formdata.append('jezik', this.jezik);
    formdata.append('naziv', this.naziv);
    formdata.append('user',this.username);
    formdata.append('zanr', this.zanr);
    let novi=0;
    this.KnjigeService.idposlednje().subscribe((r:Knjiga)=>{
      novi=Number(Number(r.id)+1)
      formdata.append('id', String(novi));
    
    if (this.image != null) {
      formdata.append('slika', this.image, this.image.name);
      this.KnjigeService.dodajKnjiguZahtev(formdata).subscribe((resp) => {
        this.message=resp['message'];
          this.stavi=true;
            this.KnjigeService.idposlednje().subscribe((resp:Knjiga)=>{
              this.id=Number(resp.id);
              this.zahteviServices.dodajZahtev(this.username,this.id).subscribe((resp) => {
                this.message="Dodat je zahtev";
                this.stavi=true;
                this.autor=""
                this.godina=""
                this.izdavao=""
                this.jezik=""
                this.zanr=""
                this.naziv=""
              })
            })
            
          
      })
    }
    else {
      this.KnjigeService.dodajKnjiguSlikaZahtev(formdata).subscribe((resp) => {
          this.message=resp['message'];
            this.KnjigeService.idposlednje().subscribe((resp:Knjiga)=>{
              this.id=Number(resp.id);
              this.zahteviServices.dodajZahtev(this.username,this.id).subscribe((resp) => {
                this.message="Dodat je zahtev";
                this.stavi=true;
                this.autor=""
                this.godina=""
                this.izdavao=""
                this.jezik=""
                this.zanr=""
                this.naziv=""
              })
            })
      });
    }
    })
    
  }
 
  }
}
