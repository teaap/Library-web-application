import { Component, OnInit } from '@angular/core';
import { Knjiga } from '../models/knjige';
import { KnjigeService } from '../services/knjige.service';
import { KomentariService } from '../services/komentari.service';

@Component({
  selector: 'app-izmeni-komentar',
  templateUrl: './izmeni-komentar.component.html',
  styleUrls: ['./izmeni-komentar.component.css']
})
export class IzmeniKomentarComponent implements OnInit {

  constructor(private KomentariServices:KomentariService,private knjigeservices:KnjigeService) { }
  ocena:number;
  ocenaStara:number
  tekst:string;
  tekstStara:string
  username:string;
  id:number;
  ocenaforfor:number[]=[0,1,2,3,4,5,6,7,8,9]
  pom:number;

  ngOnInit(): void {
    this.greska=""
    this.id=Number(sessionStorage.getItem('id'))
    this.username=sessionStorage.getItem('username')
    this.ocenaStara=Number(sessionStorage.getItem('ocena'))
    this.tekstStara=sessionStorage.getItem('tekst')
  }
  greska:string

  izmeni(){
    this.greska=""
    if(this.tekst)
      if(this.tekst.length>1000) this.greska="Komentar ima vise od 1000 karaktera"
    if(this.greska=="")
    if(this.ocena==undefined) this.ocena=this.ocenaStara
    if(this.tekst==undefined || this.tekst=="") this.tekst=this.tekstStara
    this.KomentariServices.updatekomenatar(this.id,this.username,this.tekst,this.ocena).subscribe((req)=>{
      
      this.knjigeservices.getocenazaknjigu(this.id).subscribe((oc:Number)=>{
          this.KomentariServices.brkomzasliku(this.id).subscribe((cnt:Number)=>{
             this.pom=(Number(oc)*Number(cnt)-Number(this.ocenaStara)+Number(this.ocena))/Number(cnt);
                this.knjigeservices.promeniocenu(this.id,this.pom).subscribe((req)=>{
                    alert(req['message'])
                    this.ngOnInit()
                })
             
          })
      })
    })
  
  }

}
