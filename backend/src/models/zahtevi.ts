import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Zahtev = new Schema({
    id: {
        type: Number
    },
    username: {
        type: String
    },
    spreman: {
        type: Boolean
    }
  
})

export default mongoose.model("ZahtevModel", Zahtev, 'zahtevi')