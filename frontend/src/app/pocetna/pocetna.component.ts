import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Knjiga } from '../models/knjige';
import { KnjigeService } from '../services/knjige.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private KnjigeService:KnjigeService,private sanitizer:DomSanitizer) { }

  slika:string;
  knjige3:Array<SafeUrl>=[]
  tdy:Date
  r:number
  registrovan:boolean


  ngOnInit(): void {
    this.registrovan=false
    sessionStorage.setItem('registrovan',String(this.registrovan));
    this.tdy=new Date()
    if(!sessionStorage.getItem('zaduzenje'))
    {
      sessionStorage.clear()
      sessionStorage.setItem('zaduzenje',String(14))
    }
    else {
      let a=sessionStorage.getItem('zaduzenje')
      sessionStorage.clear()
      sessionStorage.setItem('zaduzenje',a)
    }
    this.KnjigeService.brojKnjiga().subscribe((broj:number)=>{   
      this.r=this.tdy.getFullYear()*(this.tdy.getMonth()+1)*this.tdy.getDate()
      broj=this.r%broj
      sessionStorage.setItem('slikadana',String(broj))
    })
    this.KnjigeService.popularnetri().subscribe((knjige:Array<Knjiga>)=>{
      knjige.forEach((element:Knjiga) => {
        this.KnjigeService.getPicture(element.slika).subscribe((resp)=>{
          let objectURL=URL.createObjectURL(resp)
          let url=this.sanitizer.bypassSecurityTrustUrl(objectURL)
          this.knjige3.push(url)
         
        })
      });
      
    })
  }

}
