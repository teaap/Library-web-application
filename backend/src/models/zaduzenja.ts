import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Zaduzenje = new Schema({
    idKnjige: {
        type: Number
    },
    broj: {
        type: Number
    },
    username: {
        type: String
    },
    aktivan: {
        type: Boolean
    },
    produzio: {
        type: Boolean
    },
    datumOd: {
        type: Date
    },
    datumDo: {
        type: Date
    }
})

export default mongoose.model("ZaduzenjeModel", Zaduzenje, 'zaduzenja')