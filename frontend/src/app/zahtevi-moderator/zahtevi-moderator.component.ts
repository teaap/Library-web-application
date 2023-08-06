import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Knjiga } from '../models/knjige';
import { Zahtev } from '../models/zahtevi';
import { KnjigeService } from '../services/knjige.service';
import { ZahteviService } from '../services/zahtevi.service';

@Component({
  selector: 'app-zahtevi-moderator',
  templateUrl: './zahtevi-moderator.component.html',
  styleUrls: ['./zahtevi-moderator.component.css']
})
export class ZahteviModeratorComponent implements OnInit {

  constructor(private zahteviservices:ZahteviService,private route:Router,private knjigeservices:KnjigeService) { }

  allzahtevi:Array<Zahtev>=[]
  allbookszahtevi: Array<Knjiga>=[]
  status:string

  ngOnInit(): void {
    this.allzahtevi=[]
    this.allbookszahtevi=[]
    this.status=sessionStorage.getItem('blokiran')
    this.zahteviservices.getallzahtevi().subscribe((reg:Array<Zahtev>)=>{
      this.allzahtevi=reg;
      reg.forEach((element:Zahtev) => {
        this.knjigeservices.getBookId(element.id).subscribe((knjiga:Knjiga)=>{
          this.allbookszahtevi.push(knjiga)
        })
          
        })
      });
  }
  knjiga:Zahtev
  message:string

  odobri(id){
      this.knjigeservices.updatebookstatus(id).subscribe((req)=>{
        this.message=req['message'];
        this.zahteviservices.delete(id).subscribe((reg)=>{
          {this.ngOnInit()}
          
        })
      })
    
  }
  odbij(id){
    this.knjigeservices.deleteknjiga(id).subscribe((req)=>{
      this.message=req['message'];
      this.zahteviservices.delete(id).subscribe((reg)=>{
        {this.ngOnInit()}
        
      })
    })
  
}

}
