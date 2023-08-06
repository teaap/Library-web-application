import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RezervacijeServices {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'

  dodajrezervaciju(username,idKnjige){
    const data={
      username:username,
      idKnjige:idKnjige
    }
    return this.http.post(`${this.uri}/rezervacije/dodajrezervaciju`,data)
  }
  getrezervacija(username,idKnjige){
    const data={
      username:username,
      idKnjige:idKnjige
    }
    return this.http.post(`${this.uri}/rezervacije/getrezervacija`,data)
  }
  promeniaktivan(username,idKnjige){
    const data={
      username:username,
      idKnjige:idKnjige
    }
    return this.http.post(`${this.uri}/rezervacije/promeniaktivan`,data)
  }
  promeniobavesten(username,idKnjige){
    const data={
      username:username,
      idKnjige:idKnjige
    }
    return this.http.post(`${this.uri}/rezervacije/promeniobavesten`,data)
  }
  getrezervacijaid(idKnjige){
    const data={
      idKnjige:idKnjige
    }
    return this.http.post(`${this.uri}/rezervacije/getrezervacijaid`,data)
  }
  getobavestenje(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/rezervacije/getobavestenje`,data)
  }
 
}
