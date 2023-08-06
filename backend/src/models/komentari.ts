import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Komentar = new Schema({
    id: {
        type: Number
    },
    username: {
        type: String
    },
    tekst: {
        type: String
    },
    ocena: {
        type: Number
    },
    datum: {
        type: Date
    },
    izmenjen: {
        type: Boolean
    }
})

export default mongoose.model("KomentarModel", Komentar, 'komentari')