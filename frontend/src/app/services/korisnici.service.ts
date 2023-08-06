import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisniciService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  register(data){
    return this.http.post(`${this.uri}/korisnici/registracija`,data)
  }
  deletekorisnika(id){
    const data={
      idN:id
    }
    return this.http.post(`${this.uri}/korisnici/deletekorisnika`,data)
  }
  login(usernameFromForm, passwordFromForm){
    const data = {
      username: usernameFromForm,
      lozinka: passwordFromForm
    }

    return this.http.post(`${this.uri}/korisnici/login`, data)
  }

  getAllUsers(){
    return this.http.get(`${this.uri}/korisnici/getAllUsers`)
  }

  registerSlika(data){
    return this.http.post(`${this.uri}/korisnici/Regslika`,data)
  }

  loginAdmin(usernameFromForm, passwordFromForm){
    const data = {
      username: usernameFromForm,
      lozinka: passwordFromForm
    }

    return this.http.post(`${this.uri}/korisnici/loginAdmin`, data)
  }

  dohvatiKorisnika(username,lozinka){
    const data = {
      username:username,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/korisnici/dohvatiKorisnika`, data)
  }
  getUserUsername(username){
    const data = {
      username:username
    }

    return this.http.post(`${this.uri}/korisnici/getUserUsername`, data)
  }

  promeniLozinku(username,lozinka){
    const data = {
      username:username,
      lozinka: lozinka
    }

    return this.http.post(`${this.uri}/korisnici/promeniLozinku`, data)
  }

  getPicture(slika){
    const data={
      slika:slika
    }
    return this.http.post(`${this.uri}/korisnici/getPicture`,data,{responseType:'blob'})
  }

  updateKorisnik(data){
    return this.http.post(`${this.uri}/korisnici/updateUser`,data)
  }

  updateKorisnikZaduzenja(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/korisnici/updateUserZaduzenja`,data)
  }

  updateKorisnikSlika(data){  
    return this.http.post(`${this.uri}/korisnici/updateUserSlika`,data)
  }
  updateKorisnikrazaduzenja(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/korisnici/updateKorisnikrazaduzenja`,data)
  }
  
  dohvatiKorisnikausername(uf)
  {
    const data={username:uf}
    return this.http.post(`${this.uri}/korisnici/dohvatiKorisnikausername`,data)
  }
  updateBlok(username){
    const data={username:username}
    return this.http.post(`${this.uri}/korisnici/updateUBlok`,data)
  }
  updateOdBlok(username){
    const data={username:username}
    return this.http.post(`${this.uri}/korisnici/updateOdBlok`,data)
  }
  updateUModer(username){
    const data={username:username}
    return this.http.post(`${this.uri}/korisnici/updateUModer`,data)
  }
  updateUCit(username){
    const data={username:username}
    return this.http.post(`${this.uri}/korisnici/updateUCit`,data)
  }
  updateNovi(username){
    const data={username:username}
    return this.http.post(`${this.uri}/korisnici/updateNovi`,data)
  }


}
