import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZaduzenjaService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'

  dodajZaduzenje(id,username,datumOd,datumDo){
    const data={
      id:id,
      username:username,
      datumOd:datumOd,
      datumDo:datumDo
    }
    return this.http.post(`${this.uri}/zaduzenja/dodajZaduzenje`,data)
  }
  findactiveusername(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/zaduzenja/findactiveusername`,data)
  }

  findnoactiveusername(username){
    const data={
      username:username
    }
    return this.http.post(`${this.uri}/zaduzenja/findnoactiveusername`,data)
  }
  updatezaduzenjaproduzi(id,username,datumDo){
    const data={
      idKnjige:id,
      username:username,
      datumDo:datumDo
    }
    return this.http.post(`${this.uri}/zaduzenja/updatezaduzenjaproduzi`,data)    
  }
  findactiveidusername(id,username){
    const data={
      idKnjige:id,
      username:username
    }
    return this.http.post(`${this.uri}/zaduzenja/findactiveidusername`,data)    
  }
  updaterazduzi(id,username){
    const data={
      idKnjige:id,
      username:username
    }
    return this.http.post(`${this.uri}/zaduzenja/updaterazduzi`,data)    
  }
}
