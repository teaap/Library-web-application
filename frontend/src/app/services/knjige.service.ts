import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KnjigeService {

  dodajKnjigu(data){
    return this.http.post('http://localhost:4000/knjige/dodajKnjigu',data)
  }

  dodajKnjiguZahtev(data){
    return this.http.post('http://localhost:4000/knjige/dodajKnjiguZahtev',data)
  }
  getknjigeusers(searchParamff){
    const data={
      user:searchParamff
    }
    return this.http.post(`${this.uri}/knjige/getknjigeusers`,data)
  }
  zaduziknjigu(searchParamff){
    const data={
      id:searchParamff
    }
    return this.http.post(`${this.uri}/knjige/zaduziknjigu`,data)
  }
  searchBooks(searchParamff,searchAutorff){
    const data={
      searchParam:searchParamff,
      searchAutor:searchAutorff
    }
    return this.http.post(`${this.uri}/knjige/pretragaParam`,data)
  }
  idposlednje(){
    return this.http.get(`${this.uri}/knjige/idposlednje`)
  }
  razduziknjigu(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/knjige/razduziknjigu`,data)
  }
  searchBooksOneParam(searchParamff){
    const data={
      searchParam:searchParamff
    }
    return this.http.post(`${this.uri}/knjige/pretragaOneParam`,data)
  }

  dodajKnjiguSlika(data){
    return this.http.post(`${this.uri}/knjige/knjigeSlika`,data)
  }

  dodajKnjiguSlikaZahtev(data){
    return this.http.post(`${this.uri}/knjige/knjigeSlikaZahtev`,data)
  }

  getAllBooks(){
    return this.http.get(`${this.uri}/knjige/pretraga`)
  }
  getallbookssort(){
    return this.http.get(`${this.uri}/knjige/getallbookssort`)
  }
  getBookId(id){
    const data={id:id}
    return this.http.post(`${this.uri}/knjige/getBookId`,data)
  }
  updateKnjiga(data){
    return this.http.post(`${this.uri}/knjige/updateKnjiga`,data)
  }
  updateKnjigaSlika(data){
    return this.http.post(`${this.uri}/knjige/updateKnjigaSlika`,data)
  }
  constructor(private http: HttpClient) { }
  uri = 'http://localhost:4000'

  getPicture(slika){
    const data={
      slika:slika
    }
    return this.http.post(`${this.uri}/knjige/getPicture`,data,{responseType:'blob'})
  }
  getPictureOne(id){
    const data={
      id:id
    }
    return this.http.post(`${this.uri}/knjige/getPictureOne`,data,{responseType:'blob'})
  }
  getBookOne(id){
    const data={id:id}
    return this.http.post(`${this.uri}/knjige/getBookOne`,data)
  }
  popularnetri(){
    return this.http.get(`${this.uri}/knjige/popularnetri`)
  }
  brojKnjiga(){
    return this.http.get(`${this.uri}/knjige/brojKnjiga`)
  }
  updatebookstatus(id){
    const data={id:id}
    return this.http.post(`${this.uri}/knjige/updatebookstatus`,data)
  }
  searcchbooknapredna(autor,naziv,zanr,godinaod,godinado,izdavac){
    const data={
      autor:autor,
      naziv:naziv,
      zanr:zanr,
      godinaod:godinaod,
      godinado:godinado,
      izdavac:izdavac
    }
    return this.http.post(`${this.uri}/knjige/searcchbooknapredna`,data)
  }
  getknjigaid(id){
    const data={idKnjige:id}
    return this.http.post(`${this.uri}/knjige/getknjigaid`,data)
  }
  deleteknjiga(idN){
    const data={idN:idN}
    return this.http.post(`${this.uri}/knjige/deleteknjiga`,data)
  }
  getocenazaknjigu(id){
    const data={id:id}
    return this.http.post(`${this.uri}/knjige/getocenazaknjigu`,data)
  }
  promeniocenu(id,ocena){
    const data={id:id,ocena:ocena}
    return this.http.post(`${this.uri}/knjige/promeniocenu`,data)
  }
}
