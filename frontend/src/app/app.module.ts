import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { LozinkaComponent } from './lozinka/lozinka.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { ProfilComponent } from './profil/profil.component';
import { KnjigaComponent } from './knjiga/knjiga.component';
import { ZaduzenjaComponent } from './zaduzenja/zaduzenja.component';
import { FormsModule } from '@angular/forms';
import { PocetnaCitalacComponent } from './pocetna-citalac/pocetna-citalac.component';
import { PocetnaAdminComponent } from './pocetna-admin/pocetna-admin.component';
import { PocetnaModeratorComponent } from './pocetna-moderator/pocetna-moderator.component';
import { GlavnaCitalacComponent } from './glavna-citalac/glavna-citalac.component';
import { GlavnaAdministratorComponent } from './glavna-administrator/glavna-administrator.component';
import { GlavnaModeratorComponent } from './glavna-moderator/glavna-moderator.component';
import { NaprednapretragaComponent } from './naprednapretraga/naprednapretraga.component';
import { DodajKnjiguComponent } from './dodaj-knjigu/dodaj-knjigu.component';
import { DodajKnjiguModeratorComponent } from './dodaj-knjigu-moderator/dodaj-knjigu-moderator.component';
import { KnjigaModerComponent } from './knjiga-moder/knjiga-moder.component';
import { ZahteviModeratorComponent } from './zahtevi-moderator/zahtevi-moderator.component';
import { TrenutnoZaduzeneComponent } from './trenutno-zaduzene/trenutno-zaduzene.component';
import { DodajKomentarComponent } from './dodaj-komentar/dodaj-komentar.component';
import { IzmeniKomentarComponent } from './izmeni-komentar/izmeni-komentar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginAdminComponent,
    LozinkaComponent,
    PocetnaComponent,
    RegistracijaComponent,
    PretragaComponent,
    ProfilComponent,
    KnjigaComponent,
    ZaduzenjaComponent,
    PocetnaCitalacComponent,
    PocetnaAdminComponent,
    PocetnaModeratorComponent,
    GlavnaCitalacComponent,
    GlavnaAdministratorComponent,
    GlavnaModeratorComponent,
    NaprednapretragaComponent,
    DodajKnjiguComponent,
    DodajKnjiguModeratorComponent,
    KnjigaModerComponent,
    ZahteviModeratorComponent,
    TrenutnoZaduzeneComponent,
    DodajKomentarComponent,
    IzmeniKomentarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
