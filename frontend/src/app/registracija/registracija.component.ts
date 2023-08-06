import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { KorisniciService } from '../services/korisnici.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private KorisniciService:KorisniciService) { }

  ngOnInit(): void {
  }

    adresa: string="";
    email: string="";
    ime: string="";
    prezime:  string="";
    lozinka: string="";
    potvrdalozinke:string="";
    slika: File;
    telefon: string="";
    username: string="";
    message:string;
    image:File;
    stavi:boolean;
    

    registracija()
    {
      if(this.provera()){
      let formdata = new FormData();

      formdata.append('username', this.username);
      formdata.append('lozinka', this.lozinka);
      formdata.append('email', this.email);
      formdata.append('telefon', this.telefon);
      formdata.append('ime', this.ime);
      formdata.append('prezime', this.prezime);
      formdata.append('adresa', this.adresa);

      
      if (this.image != null) {
        formdata.append('slika', this.image, this.image.name);
        this.KorisniciService.register(formdata).subscribe((resp) => {
          this.message=resp['message'];
            this.stavi=true;
        })
      }
      else {
        this.KorisniciService.registerSlika(formdata).subscribe((resp) => {
          if (resp['message'] === 'uspesno') {
            this.message=resp['message'];
          }
        });
      }
    }
    }
     neispravnalozinka:string;
     duplalozinka:string;
     adresaneispravna:string;
     adresap(){
      let proba=/^[A-Z][a-zA-Z ]+ \d{1,3}, [A-Z][a-zA-Z ]+$/
      if(proba.test(this.adresa)){
        this.adresaneispravna=""
      }
      else {
        this.adresaneispravna="Adresa je neispravna"
        
      }
     }

     lozinkap(){
      let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,12}$/;
      if(pattern.test(this.lozinka)){
        this.neispravnalozinka=""
      }
      else {
        this.neispravnalozinka="Lozinka je nevalidna"
        
      }
     }
     lozinkad(){
      if(this.lozinka!=this.potvrdalozinke) this.duplalozinka="Lozinke moraju da se poklapaju"
      else this.duplalozinka=""
     }
      
      provera():boolean{
       
      if (this.ime != '' && this.email != '' && this.prezime != '' && this.telefon != '' && this.adresa != '' && this.lozinka != '' && this.potvrdalozinke != '' && this.username!='' ) {
        
        return true;
      }
      alert("Popunite sva polja!");
      return false;
    }
    onFileChanged(event) {
      if (!event.target.value) {
        this.image = null as any;     
        } 
      else {
        this.image = event.target.files[0];
      }
  }
  

}

