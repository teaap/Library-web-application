import express from 'express';
import { KomentariController } from '../controllers/komentri.controlers';

const komentariRouter = express.Router();
const multer=require('multer')
const upload=multer({dest:'./slike'})

komentariRouter.route('/getkomentarid').post(
    (req, res)=>new KomentariController().getkomenatarid(req, res)
)
komentariRouter.route('/getkomentaridusername').post(
    (req, res)=>new KomentariController().getkomenataridusername(req, res)
)
komentariRouter.route('/addkomentar').post(
    (req, res)=>new KomentariController().addkomentar(req, res)
)
komentariRouter.route('/updatekomenatar').post(
    (req, res)=>new KomentariController().updatekomenatar(req, res)
)
komentariRouter.route('/brkomzasliku').post(
    (req, res)=>new KomentariController().brkomzasliku(req, res)
)


export default komentariRouter;