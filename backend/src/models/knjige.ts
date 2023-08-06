import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Knjiga = new Schema({
    id: {
        type: Number
    },
    autor: {
        type: String
    },
    godina: {
        type: String
    },
    izdavac: {
        type: String
    },
    ocena: {
        type: Number
    },
    jezik: {
        type: String
    },
    naziv: {
        type: String
    },
    zanr: {
        type: String
    },
    slika: {
        type:String
    },
    preuzimana:{
        type:Number
    },
    status:{
        type:String
    },
    zaduzena:{
        type:Number
    },
    user:{
        type:String
    },
    stanje:{
        type:Number
    }
})

export default mongoose.model("KnjigaModel", Knjiga, 'knjige')