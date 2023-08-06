import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Knjiga } from '../models/knjige';
import { KnjigeService } from '../services/knjige.service';
import { KorisniciService } from '../services/korisnici.service';

@Component({
  selector: 'app-glavna-citalac',
  templateUrl: './glavna-citalac.component.html',
  styleUrls: ['./glavna-citalac.component.css']
})
export class GlavnaCitalacComponent implements OnInit {

  constructor(private KnjigeService:KnjigeService,private sanitizer:DomSanitizer,private route:Router,private korisniciService:KorisniciService) { }

  slika:string;
  slikaK:string;
  urll;
  knjige3:Array<SafeUrl>=[]
  ngOnInit(): void {
    this.slikaK=sessionStorage.getItem('slika');
    this.status=sessionStorage.getItem('blokiran')
    
    this.KnjigeService.getPicture(this.slikaK).subscribe((resp)=>{
      let objectURL=URL.createObjectURL(resp)
      this.urll=this.sanitizer.bypassSecurityTrustUrl(objectURL)
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

  naprofil(){
    this.route.navigate(['profil'])
  }
  status:string

  logout()
  {
    this.route.navigate([''])
  }
}
