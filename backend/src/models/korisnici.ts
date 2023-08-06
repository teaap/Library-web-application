import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    adresa: {
        type: String
    },
    email: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    lozinka: {
        type: String
    },
    slika: {
        type:String
    },
    status: {
        type:String
    },
    tip: {
        type:String
    },
    zaduzeno: {
        type:Number
    },
    id: {
        type:Number
    },
    username: {
        type:String
    },
    telefon:{
        type:String
    }

})

export default mongoose.model("KorisnikModel", Korisnik, 'korisnici')