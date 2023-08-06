import express from 'express';
import { ZahteviController } from '../controllers/zahtevi.controllers';

const zahteviRouter = express.Router();
const multer=require('multer')
const upload=multer({dest:'./slike'})

zahteviRouter.route('/dodajZahtev').post(
    (req, res)=> new ZahteviController().dodajZahtev(req, res)
)
zahteviRouter.route('/delete').post(
    (req, res)=> new ZahteviController().delete(req, res)
)
zahteviRouter.route('/getallzahtevi').get(
    (req, res)=> new ZahteviController().getallzahtevi(req, res)
)
zahteviRouter.route('/getzahtevid').post(
    (req, res)=> new ZahteviController().getzahtevid(req, res)
)

export default zahteviRouter;