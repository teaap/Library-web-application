import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KnjigeService } from '../services/knjige.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Knjiga } from '../models/knjige';

@Component({
  selector: 'app-glavna-moderator',
  templateUrl: './glavna-moderator.component.html',
  styleUrls: ['./glavna-moderator.component.css']
})
export class GlavnaModeratorComponent implements OnInit {

  constructor(private KnjigeService:KnjigeService,private sanitizer:DomSanitizer,private route:Router) { }

  slika:string;
  knjige3:Array<SafeUrl>=[]
  urll;
  slikaK:string;
  status:string
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

  logout()
  {
    this.route.navigate([''])
  }
}
