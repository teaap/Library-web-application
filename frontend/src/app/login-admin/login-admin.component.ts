import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnici';
import { KorisniciService } from '../services/korisnici.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private KorisniciServices:KorisniciService,private router: Router) { }

  ngOnInit(): void {
  }

  username:string;
  lozinka:string;
  stavi:boolean;
  message:string;

  login(){
    
    this.KorisniciServices.loginAdmin(this.username, this.lozinka).subscribe((userFromDB: Korisnik)=>{
      this.stavi=true;
      if(userFromDB!=null){
        if(userFromDB.tip=="citalac"){
          this.router.navigate(['citalac']);
        }
        else if(userFromDB.tip=="moderator"){
          this.router.navigate(['moderator']);
        }
        else{
          this.router.navigate(['administrator']);
        }
      }
      else{
        this.message="Ne postoji korisnik"
      }
    })
    
  }
}


