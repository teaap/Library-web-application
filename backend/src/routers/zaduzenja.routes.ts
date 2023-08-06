import express from 'express';
import { ZaduzenjaController } from '../controllers/zaduzenja.controllers';

const zaduzenjaRouter = express.Router();
const multer=require('multer')
const upload=multer({dest:'./slike'})

zaduzenjaRouter.route('/dodajZaduzenje').post(
    (req, res)=> new ZaduzenjaController().dodajZaduzenje(req, res)
)
zaduzenjaRouter.route('/findactiveusername').post(
    (req, res)=> new ZaduzenjaController().findactiveusername(req, res)
)
zaduzenjaRouter.route('/findnoactiveusername').post(
    (req, res)=> new ZaduzenjaController().findnoactiveusername(req, res)
)
zaduzenjaRouter.route('/updatezaduzenjaproduzi').post(
    (req, res)=> new ZaduzenjaController().updatezaduzenjaproduzi(req, res)
)
zaduzenjaRouter.route('/findactiveusername').post(
    (req, res)=> new ZaduzenjaController().findactiveusername(req, res)
)
zaduzenjaRouter.route('/findactiveidusername').post(
    (req, res)=> new ZaduzenjaController().findactiveidusername(req, res)
)
zaduzenjaRouter.route('/updaterazduzi').post(
    (req, res)=> new ZaduzenjaController().updaterazduzi(req, res)
)
export default zaduzenjaRouter;