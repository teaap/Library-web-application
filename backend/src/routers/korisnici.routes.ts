import express from 'express';
import { KorisniciController } from '../controllers/korisnici.controllers';

const korisniciRouter = express.Router();
const multer=require('multer')
const upload=multer({dest:'./slike'})

korisniciRouter.post('/registracija',upload.single('slika'),(req:any,res:any)=>{
    req.body.slika= req.file.filename
    new KorisniciController().register(req,res)
})
korisniciRouter.route('/getUserUsername').post(
    (req, res)=>new KorisniciController().getUserUsername(req, res)
)
korisniciRouter.route('/login').post(
    (req, res)=>new KorisniciController().login(req, res)
)
korisniciRouter.post('/updateUserSlika',upload.fields([]),(req:any,res:any)=>{
    new KorisniciController().updateKorisnikSlika(req,res)
})
korisniciRouter.route('/updateUserZaduzenja').post((req:any,res:any)=>{
    new KorisniciController().updateKorisnikZaduzenja(req,res)
})
korisniciRouter.route('/updateKorisnikrazaduzenja').post((req:any,res:any)=>{
    new KorisniciController().updateKorisnikrazaduzenja(req,res)
})
korisniciRouter.route('/deletekorisnika').post(
    (req, res)=>new KorisniciController().deletekorisnika(req, res)
)
korisniciRouter.post('/updateUser',upload.single('slika'),(req:any,res:any)=>{
    req.body.slika= req.file.filename
    new KorisniciController().updateKorisnik(req,res)
})
korisniciRouter.route('/loginAdmin').post(
    (req, res)=>new KorisniciController().loginAdmin(req, res)
)
korisniciRouter.route('/getPicture').post(
    (req,res)=>{ new KorisniciController().getPicture(req,res);
    
})
korisniciRouter.route('/dohvatiKorisnika').post(
    (req,res)=>{ new KorisniciController().dohvatiKorisnika(req,res);
    
})
korisniciRouter.route('/getAllUsers').get(
    (req, res)=> new KorisniciController().getAllUsers(req, res)
)
korisniciRouter.route('/dohvatiKorisnikausername').post(
    (req,res)=>{ new KorisniciController().dohvatiKorisnikausername(req,res);    
})
korisniciRouter.route('/promeniLozinku').post(
    (req,res)=>{ new KorisniciController().promeniLozinku(req,res);  
})
korisniciRouter.route('/updateUBlok').post(
    (req,res)=>{ new KorisniciController().updateBlok(req,res);  
})
korisniciRouter.route('/updateOdBlok').post(
    (req,res)=>{ new KorisniciController().updateOdBlok(req,res);  
})
korisniciRouter.route('/updateNovi').post(
    (req,res)=>{ new KorisniciController().updateNovi(req,res);  
})
korisniciRouter.route('/updateUModer').post(
    (req,res)=>{ new KorisniciController().updateUModer(req,res);  
})
korisniciRouter.route('/updateUCit').post(
    (req,res)=>{ new KorisniciController().updateUCit(req,res);  
})
korisniciRouter.post('/Regslika',upload.fields([]),(req:any,res:any)=>{
    new KorisniciController().regslika(req,res)
})

export default korisniciRouter;