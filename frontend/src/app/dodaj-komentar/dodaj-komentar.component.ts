import { Component, OnInit } from '@angular/core';
import { KnjigeService } from '../services/knjige.service';
import { KomentariService } from '../services/komentari.service';

@Component({
  selector: 'app-dodaj-komentar',
  templateUrl: './dodaj-komentar.component.html',
  styleUrls: ['./dodaj-komentar.component.css']
})
export class DodajKomentarComponent implements OnInit {

  constructor(private KomentariServices:KomentariService,private knjigeservices:KnjigeService) { }

  ocenaFor:number[]
  ocenaforfor:number[]=[0,1,2,3,4,5,6,7,8,9]
  ocena:number;
  username:string;
  id:number
  ocenaknjige:number
  tekst:string
  ngOnInit(): void {
    this.greska=""
    this.ocenaFor=[];
    this.username=sessionStorage.getItem('username')
    this.id=Number(sessionStorage.getItem('id'))
    this.KomentariServices.brkomzasliku(this.id).subscribe((oc:number)=>{console.log(oc)})
    this.knjigeservices.getocenazaknjigu(this.id).subscribe((oc:number)=>{this.ocenaknjige=oc})
  }
  pom:number;
  greska:string

  promeni1(){ 
    if(this.tekst.length>1000) this.greska="Previse karaktera"
      else{
    for(var i = 0; i < 10; i++)
    { 
      if(this.ocena>i)
        this.ocenaFor[i]=1
      else
        this.ocenaFor[i]=0
    }
    if(this.ocena==undefined) this.ocena=5
    this.KomentariServices.addkomentar(this.id,this.username,this.tekst,this.ocena).subscribe((req)=>{
      
      this.knjigeservices.getocenazaknjigu(this.id).subscribe((oc:number)=>{
        this.KomentariServices.brkomzasliku(this.id).subscribe((cnt:number)=>{
           this.pom=(Number(oc)*Number(cnt-1)+Number(this.ocena))/(Number(cnt));
              this.knjigeservices.promeniocenu(this.id,this.pom).subscribe((requ)=>{
                  alert(req['message'])
                  this.ngOnInit()
              })
           
        })
      })
    
    })
  }
  }

}
