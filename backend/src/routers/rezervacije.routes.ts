import express from 'express';
import { RezervacijaController } from '../controllers/rezervacije.controllers';

const rezervacijeRouter = express.Router();

rezervacijeRouter.route('/dodajrezervaciju').post(
    (req, res)=> new RezervacijaController().dodajrezervaciju(req, res)
)
rezervacijeRouter.route('/getrezervacija').post(
    (req, res)=> new RezervacijaController().getrezervacija(req, res)
)
rezervacijeRouter.route('/getrezervacijaid').post(
    (req, res)=> new RezervacijaController().getrezervacijaid(req, res)
)
rezervacijeRouter.route('/promeniaktivan').post(
    (req, res)=> new RezervacijaController().promeniaktivan(req, res)
)
rezervacijeRouter.route('/promeniobavesten').post(
    (req, res)=> new RezervacijaController().promeniobavesten(req, res)
)
rezervacijeRouter.route('/getobavestenje').post(
    (req, res)=> new RezervacijaController().getobavestenje(req, res)
)
export default rezervacijeRouter;