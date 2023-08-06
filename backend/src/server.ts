import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import korisniciRouter from './routers/korisnici.routes';
import knjigeRouter from './routers/knjige.routes';
import zahteviRouter from './routers/zahtevi.routes';
import zaduzenjaRouter from './routers/zaduzenja.routes';
import komentariRouter from './routers/komentari.routes';
import rezervacijeRouter from './routers/rezervacije.routes';

const app = express();
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb://localhost:27017/biblioteka')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/korisnici', korisniciRouter)
router.use('/knjige', knjigeRouter)
router.use('/zahtevi', zahteviRouter)
router.use('/zaduzenja', zaduzenjaRouter)
router.use('/komentari', komentariRouter)
router.use('/rezervacije', rezervacijeRouter)

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));