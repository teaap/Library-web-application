import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DodajKnjiguModeratorComponent } from './dodaj-knjigu-moderator/dodaj-knjigu-moderator.component';
import { DodajKnjiguComponent } from './dodaj-knjigu/dodaj-knjigu.component';
import { DodajKomentarComponent } from './dodaj-komentar/dodaj-komentar.component';
import { GlavnaAdministratorComponent } from './glavna-administrator/glavna-administrator.component';
import { GlavnaCitalacComponent } from './glavna-citalac/glavna-citalac.component';
import { GlavnaModeratorComponent } from './glavna-moderator/glavna-moderator.component';
import { IzmeniKomentarComponent } from './izmeni-komentar/izmeni-komentar.component';
import { KnjigaModerComponent } from './knjiga-moder/knjiga-moder.component';
import { KnjigaComponent } from './knjiga/knjiga.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LoginComponent } from './login/login.component';
import { LozinkaComponent } from './lozinka/lozinka.component';
import { NaprednapretragaComponent } from './naprednapretraga/naprednapretraga.component';
import { PocetnaAdminComponent } from './pocetna-admin/pocetna-admin.component';
import { PocetnaCitalacComponent } from './pocetna-citalac/pocetna-citalac.component';
import { PocetnaModeratorComponent } from './pocetna-moderator/pocetna-moderator.component';
import {  PocetnaComponent } from './pocetna/pocetna.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { ProfilComponent } from './profil/profil.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { TrenutnoZaduzeneComponent } from './trenutno-zaduzene/trenutno-zaduzene.component';
import { ZaduzenjaComponent } from './zaduzenja/zaduzenja.component';
import { ZahteviModeratorComponent } from './zahtevi-moderator/zahtevi-moderator.component';

const routes: Routes = [
  {path: '', component: PocetnaComponent},
  {path: 'pocetna', component: PocetnaComponent},
  {path: 'registracija', component: RegistracijaComponent},
  {path: 'login', component: LoginComponent},
  {path: 'citalac', component:PocetnaCitalacComponent },
  {path: 'administrator', component: PocetnaAdminComponent},
  {path: 'moderator', component: PocetnaModeratorComponent},
  {path: 'glavnaCitalac', component:GlavnaCitalacComponent },
  {path: 'glavnaAdministrator', component: GlavnaAdministratorComponent},
  {path: 'glavnaModerator', component: GlavnaModeratorComponent},
  {path: 'loginAdmin', component: LoginAdminComponent},
  {path: 'pretraga', component: PretragaComponent},
  {path: 'naprednapretraga', component: NaprednapretragaComponent},
  {path: 'lozinka', component: LozinkaComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'dodajknjigumod', component:DodajKnjiguModeratorComponent},
  {path: 'dodajknjigu', component:DodajKnjiguComponent},
  {path: 'knjiga', component:KnjigaComponent},
  {path: 'knjigamoder', component:KnjigaModerComponent},
  {path: 'zahtevimoder', component:ZahteviModeratorComponent},
  {path: 'zaduzenja', component:ZaduzenjaComponent},
  {path: 'trenutnazaduzenja', component:TrenutnoZaduzeneComponent},
  {path: 'dodajkomentar', component:DodajKomentarComponent},
  {path: 'izmenikomentar', component:IzmeniKomentarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
