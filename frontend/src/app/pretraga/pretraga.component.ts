import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Knjiga } from '../models/knjige';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { KnjigeService } from '../services/knjige.service';

@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {

  constructor(private KnjigeServices:KnjigeService,private sanitizer:DomSanitizer,private route:Router) { }

  allBooks:Knjiga[]
  registrovan:boolean
 

  ngOnInit(): void {
    this.status=sessionStorage.getItem('blokiran')
    this.registrovan=Boolean(sessionStorage.getItem('registrovan'));
    this.vrsta=sessionStorage.getItem('vrsta');
    this.KnjigeServices.getAllBooks().subscribe((data: Knjiga[])=>{
      this.allBooks = data;
    })
    
  }
  searchParam: string;
  id:Number;
  username:string;
  pronadjena:Knjiga;
  searchAutor:string;
  searchedBooks: Knjiga[] = []

  nasliku(id){
    
    this.KnjigeServices.searchBooksOneParam(id).subscribe((data: Knjiga)=>{
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
  
    if(this.vrsta=='citalac' ||  this.registrovan==false){
     this.route.navigate(['knjiga'])
    }
    else
    this.route.navigate(['knjigamoder'])
    })
    
    
    
  }
  vrsta:string;
  status:string
  search(){
    if(this.searchAutor==undefined) this.searchAutor="";
    if(this.searchParam==undefined) this.searchParam="";
    this.KnjigeServices.searchBooks(this.searchParam,this.searchAutor).subscribe((knjige: Knjiga[])=>{
      knjige.forEach((element:Knjiga) => { 
        element.url=null
        this.searchedBooks.push(element)
        this.KnjigeServices.getPicture(element.slika).subscribe((resp)=>{
          let objectURL=URL.createObjectURL(resp)
          element.url=this.sanitizer.bypassSecurityTrustUrl(objectURL)
         
         
        })
      });
    })
  }

}
