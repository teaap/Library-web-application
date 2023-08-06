import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../models/knjige';
import { Zaduzenje } from '../models/zaduzenja';
import { KnjigeService } from '../services/knjige.service';
import { ZaduzenjaService } from '../services/zaduzenja.service';

@Component({
  selector: 'app-zaduzenja',
  templateUrl: './zaduzenja.component.html',
  styleUrls: ['./zaduzenja.component.css']
})
export class ZaduzenjaComponent implements OnInit {

  constructor(private zaduzenjaservices:ZaduzenjaService,private knjigeservices:KnjigeService,private route:Router) { }

  allBooks:Array<Knjiga>
  allActiveZaduzenja:Array<Zaduzenje>
  username:string
  postavljen:boolean
 

  ngOnInit(): void {
    this.username=sessionStorage.getItem('username')
    this.status=sessionStorage.getItem('blokiran')
    this.allBooks=[]
    this.postavljen=false
    this.vrsta=sessionStorage.getItem('vrsta')
    this.allActiveZaduzenja=[]
    this.zaduzenjaservices.findnoactiveusername(this.username).subscribe((reg:Array<Zaduzenje>)=>{
      this.allActiveZaduzenja=reg;
      reg.forEach((element:Zaduzenje) => {
        this.knjigeservices.getBookId(element.idKnjige).subscribe((knjiga:Knjiga)=>{
          knjiga.datumOd=element.datumOd;
          knjiga.datumDo=element.datumDo;
          knjiga.username=element.username;
          this.allBooks.push(knjiga)
          this.postavljen=true
          this.opcija="7"
          this.sortiraj()
        })
        
          
        })
        
        
      });
  }
  status:string
  vrsta:string;

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
      sessionStorage.setItem('id',id);

      this.vrsta=sessionStorage.getItem('vrsta');
      if(this.vrsta=='citalac')
        this.route.navigate(['knjiga'])
      else if(this.vrsta=='moderator')
        this.route.navigate(['knjigamoder'])
    })
    
  }
  opcija:string;

  sortiraj(){
    if(this.opcija=='1'){
      this.allBooks.sort((b1,b2)=>{
        if(b1.naziv<b2.naziv) return 1;
        else if(b1.naziv==b2.naziv) return 0;
        else return -1;
      })
      
    }
    else if(this.opcija=='2'){
      this.allBooks.sort((b1,b2)=>{
        if(b1.naziv>b2.naziv) return 1;
        else if(b1.naziv==b2.naziv) return 0;
        else return -1;
      })
    }
    else if(this.opcija=='3'){
      this.allBooks.sort((b1,b2)=>{
        if(b1.autor<b2.autor) return 1;
        else if(b1.autor==b2.autor) return 0;
        else return -1;
      })
    }
    else if(this.opcija=='4'){
      this.allBooks.sort((b1,b2)=>{
        if(b1.autor>b2.autor) return 1;
        else if(b1.autor==b2.autor) return 0;
        else return -1;
      })
    }
    else if(this.opcija=='5'){
      this.allBooks.sort((b1,b2)=>{
        if(b1.datumOd<b2.datumOd) return 1;
        else if(b1.datumOd==b2.datumOd) return 0;
        else return -1;
      })
    }
    else if(this.opcija=='6'){
      this.allBooks.sort((b1,b2)=>{
        if(b1.datumOd>b2.datumOd) return 1;
        else if(b1.datumOd==b2.datumOd) return 0;
        else return -1;
      })
    }
    else if(this.opcija=='7'){
      this.allBooks.sort((b1,b2)=>{
        if(b1.datumDo<b2.datumDo) return 1;
        else if(b1.datumDo==b2.datumDo) return 0;
        else return -1;
      })
    }
    else if(this.opcija=='8'){
      this.allBooks.sort((b1,b2)=>{
        if(b1.datumDo>b2.datumDo) return 1;
        else if(b1.datumDo==b2.datumDo) return 0;
        else return -1;
      })
    }
  }



}