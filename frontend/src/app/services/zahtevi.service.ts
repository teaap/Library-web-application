import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ZahteviService {

  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'

  dodajZahtev(username,id){
    const data={
      username:username,
      id:id
    }
    return this.http.post(`${this.uri}/zahtevi/dodajZahtev`,data)
  }
  getallzahtevi(){
    return this.http.get(`${this.uri}/zahtevi/getallzahtevi`)
  }
  getzahtevid(id){
    const data={id:id}
    return this.http.post(`${this.uri}/zahtevi/getzahtevid`,data)
  }
  findactiveusername(username){
    const data={username:username}
    return this.http.post(`${this.uri}/zahtevi/username`,data)
  }
  delete(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/zahtevi/delete`,data)
  }
}
