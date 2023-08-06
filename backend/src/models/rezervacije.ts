import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Rezervacija = new Schema({
    idKnjige: {
        type: Number
    },
    username: {
        type: String
    },
    id: {
        type: Number
    },
    aktivan:{
        type:String
    },
    obavesten:{
        type:String
    }
  
})

export default mongoose.model("RezervacijaModel", Rezervacija, 'rezervacije')