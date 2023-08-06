import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Knjiga } from '../models/knjige';
import { KnjigeService } from '../services/knjige.service';

@Component({
  selector: 'app-naprednapretraga',
  templateUrl: './naprednapretraga.component.html',
  styleUrls: ['./naprednapretraga.component.css']
})
export class NaprednapretragaComponent implements OnInit {

  constructor(private KnjigeServices:KnjigeService,private sanitizer:DomSanitizer,private route:Router) { }

  allBooks:Knjiga[]
 

  ngOnInit(): void {
    let i=0
    this.genres=[]
    while(i<9){this.genres.push(0);i=i+1}
    this.genres.forEach((elem:number)=>console.log(elem))
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
  searchzanr:string;
  searchedBooks: Knjiga[] = []
  searchDatuOd:string;
  searchDatumDo:string;
  izdavac:string;

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
    
    if(this.vrsta=='citalac')
    this.route.navigate(['knjiga'])
    else
    this.route.navigate(['knjigamoder'])
    })
    
    
    
  }
  vrsta:string;

  addgenre(id)
  {
    this.genres[id]++
  }

  zanrovi:Array<String>
  genres:Array<number>
  gp:string
  gk:string

  message:Array<String>=[]
  search(){
    this.zanrovi=[]
    this.searchedBooks=[]
    if(this.searchAutor==undefined) this.searchAutor="";
    if(this.searchzanr==undefined) this.searchzanr="";
    if(this.searchParam==undefined) this.searchParam="";
    if(this.searchDatuOd==undefined) this.gp="0";
    if(this.searchDatumDo==undefined) this.gk=String(Number.MAX_SAFE_INTEGER);
    if(this.izdavac==undefined ) this.izdavac="";
    this.searchzanr=String(this.searchzanr)
    let cao=0
    let pros=0
    this.zanrovi=[]
    while(1)
    {
      cao=this.searchzanr.substring(pros,pros+this.searchzanr.length).indexOf(",")
      if(cao==-1) break
        this.zanrovi.push(this.searchzanr.substring(pros,pros+cao))
        pros=pros+cao+1
    }
    this.zanrovi.push(this.searchzanr.substring(pros,pros+this.searchzanr.length))
    this.zanrovi.forEach((elem:String)=>{
        this.KnjigeServices.searcchbooknapredna(this.searchAutor,this.searchParam,elem,this.gp,this.gk,this.izdavac).subscribe((books:Knjiga[])=>{

          books.forEach((b:Knjiga)=>{
              
              if(this.searchedBooks.indexOf(b)==-1){
                
                this.KnjigeServices.getPicture(b.slika).subscribe((resp)=>{
                  let objectURL=URL.createObjectURL(resp)
                  b.url=this.sanitizer.bypassSecurityTrustUrl(objectURL)                       
                })
                this.searchedBooks.push(b);
              }
            })

        })
          
    })

  }

}