import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KomentariService {

  constructor(private http:HttpClient) { }
  uri = 'http://localhost:4000'

  getkomentarid(id){
    const data={id:id}
    return this.http.post(`${this.uri}/komentari/getkomentarid`,data)
  }
  getkomentaridusername(id,username){
    
    const data={id:id,username:username}
    return this.http.post(`${this.uri}/komentari/getkomentaridusername`,data)
  }
  addkomentar(id,username,tekst,ocena){
    const data={id:id,username:username,tekst:tekst,ocena:ocena}
    return this.http.post(`${this.uri}/komentari/addkomentar`,data)
  }
  updatekomenatar(id,username,tekst,ocena){
    const data={id:id,username:username,tekst:tekst,ocena:ocena}
    return this.http.post(`${this.uri}/komentari/updatekomenatar`,data)
  }
  brkomzasliku(id){
    const data={id:id}
    return this.http.post(`${this.uri}/komentari/brkomzasliku`,data)
  }
}
