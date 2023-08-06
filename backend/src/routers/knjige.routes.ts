import express from 'express';
import { KnjigeController } from '../controllers/knjige.controllers';

const knjigeRouter = express.Router();
const multer=require('multer')
const upload=multer({dest:'./slike'})

knjigeRouter.post('/knjigeSlika',upload.fields([]),(req:any,res:any)=>{
    new KnjigeController().dodajKnjiguSlika(req,res)
})

knjigeRouter.post('/knjigeSlikaZahtev',upload.fields([]),(req:any,res:any)=>{
    new KnjigeController().dodajKnjiguSlikaZahtev(req,res)
})
knjigeRouter.route('/getknjigeusers').post(
    (req, res)=> new KnjigeController().getknjigeusers(req, res)
)
knjigeRouter.route('/idposlednje').get(
    (req, res)=> new KnjigeController().idposlednje(req, res)
)
knjigeRouter.route('/pretraga').get(
    (req, res)=> new KnjigeController().getAllBooks(req, res)
)
knjigeRouter.route('/zaduziknjigu').post(
    (req, res)=> new KnjigeController().zaduziknjigu(req, res)
)
knjigeRouter.route('/pretragaOneParam').post(
    (req, res)=> new KnjigeController().searchBooksOneParam(req, res)
)
knjigeRouter.route('/razduziknjigu').post(
    (req, res)=> new KnjigeController().razduziknjigu(req, res)
)
knjigeRouter.route('/brojKnjiga').get(
    (req, res)=> new KnjigeController().brojKnjiga(req, res)
)

knjigeRouter.route('/pretragaParam').post(
    (req, res) => new KnjigeController().searchBooks(req, res)
)

knjigeRouter.post('/dodajKnjigu',upload.single('slika'),(req:any,res:any)=>{
    req.body.slika= req.file.filename
    new KnjigeController().dodajKnjigu(req,res)
})

knjigeRouter.post('/dodajKnjiguZahtev',upload.single('slika'),(req:any,res:any)=>{
    req.body.slika= req.file.filename
    new KnjigeController().dodajKnjiguZahtev(req,res)
})

knjigeRouter.route('/getPicture').post((req,res)=>{
    new KnjigeController().getPicture(req,res);
    
})
knjigeRouter.route('/getBookOne').post((req,res)=>{
    new KnjigeController().getBookOne(req,res);       
})
knjigeRouter.route('/getBookId').post((req,res)=>{
    new KnjigeController().getBookId(req,res);       
})
knjigeRouter.route('/updatebookstatus').post((req,res)=>{
    new KnjigeController().updatebookstatus(req,res);       
})
knjigeRouter.post('/updateKnjigaSlika',upload.fields([]),(req:any,res:any)=>{
    new KnjigeController().updateBookSlika(req,res)
})
knjigeRouter.post('/updateKnjiga',upload.single('slika'),(req:any,res:any)=>{
    req.body.slika= req.file.filename
    new KnjigeController().updateBook(req,res)
})
knjigeRouter.route('/getPictureOne').post((req,res)=>{
 new KnjigeController().getPictureOne(req,res);  
})
knjigeRouter.route('/getallbookssort').get((req,res)=>{
    new KnjigeController().getallbookssort(req,res);  
})

knjigeRouter.route('/popularnetri').get((req,res)=>{
    new KnjigeController().popularnetri(req,res);  
})
knjigeRouter.route('/getknjigaid').post((req,res)=>{
    new KnjigeController().getknjigaid(req,res);  
})
knjigeRouter.route('/deleteknjiga').post((req,res)=>{
    new KnjigeController().deleteknjiga(req,res);  
})
knjigeRouter.route('/searcchbooknapredna').post((req,res)=>{
    new KnjigeController().searcchbooknapredna(req,res);  
})
knjigeRouter.route('/getocenazaknjigu').post((req,res)=>{
    new KnjigeController().getocenazaknjigu(req,res);  
})
knjigeRouter.route('/promeniocenu').post((req,res)=>{
    new KnjigeController().promeniocenu(req,res);  
})
export default knjigeRouter;