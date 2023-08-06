import express from 'express'
import knjige from '../models/knjige'
import KnjigeModel from '../models/knjige'

export class KnjigeController{

    getPicture  = (req: express.Request, res: express.Response) =>{
        let slika = req.body.slika;
        var path = require('path');
        let lastindex = __dirname.lastIndexOf(path.sep);
        lastindex = __dirname.lastIndexOf(path.sep, lastindex - 1);
        let parentFolder = __dirname.substr(0,lastindex);
        res.sendFile(`${parentFolder}${path.sep}slike${path.sep}${slika}`)
       
    }

    deleteknjiga= (req: express.Request, res: express.Response)=>{
        let idN = req.body.idN;

        KnjigeModel.deleteOne({'id': idN}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }

    zaduziknjigu= (req: express.Request, res: express.Response)=>{
        let id=Number(req.body.id);
        KnjigeModel.updateMany(
            {'id':id},
            {$inc:{'preuzimana':1,'stanje':-1,'zaduzena':1}}
        ).exec( 
            (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Odobreno'})
        })
    }

    razduziknjigu= (req: express.Request, res: express.Response)=>{
        let id=Number(req.body.id);
        KnjigeModel.updateMany({'id':id},{$inc:{'zaduzena':-1,'stanje':1}}
        ).exec( 
            (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Odobreno'})
        })
    }

    getPictureOne  = (req: express.Request, res: express.Response) =>{
        let id=req.body.id
        KnjigeModel.findOne({'id': id}, (err, user)=>{
            if(err) console.log(err);
            else{ 
                
                let slika = user.slika;
                var path = require('path');
              
                let lastindex = __dirname.lastIndexOf(path.sep);
                lastindex = __dirname.lastIndexOf(path.sep, lastindex - 1);
                let parentFolder = __dirname.substr(0,lastindex);
                res.sendFile(`${parentFolder}${path.sep}slike${path.sep}${slika}`)}
        })   
    }

    getBookOne  = (req: express.Request, res: express.Response) =>{
        let id=req.body.id
        KnjigeModel.findOne({'id': id}, (err, user)=>{
            if(err) console.log(err);
            else{ 
                res.json(user)
            }
        })             
    }

    getBookId  = (req: express.Request, res: express.Response) =>{
        let id=req.body.id;
        KnjigeModel.findOne({'id': id}, (err, user)=>{
            if(err) console.log(err);
            else{ 
                res.json(user)
            }
        })                   
    }

    getAllBooks = (req: express.Request, res: express.Response)=>{
        KnjigeModel.find({}, (err, books)=>{
            if(err) console.log(err)
            else res.json(books)
        })

    }

    getallbookssort = (req: express.Request, res: express.Response)=>{
        KnjigeModel.find({}).sort({id:1}).exec( (err, books)=>{
            if(err) console.log(err)
            else res.json(books)
        })
    }
    
    searchBooks = (req: express.Request, res: express.Response)=>{
        let searchParam = req.body.searchParam;
        let searchAutor = req.body.searchAutor;

        KnjigeModel.find({$and: [
            { naziv: { $regex: searchParam, $options: "i" } },
            { status: 'dodata' },
            { autor: { $regex: searchAutor, $options: "i" } }
            
          ]}
          , (err, books)=>{
            if(err) console.log(err)
            else res.json(books)
        })
    }

    promeniocenu = (req: express.Request, res: express.Response) =>{
        let ocena=req.body.ocena
        let id=req.body.id

        KnjigeModel.updateOne({'id':id},{$set:{'ocena':ocena}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'updated'})
        })
    }

    brojKnjiga = (req: express.Request, res: express.Response)=>{
        KnjigeModel.find({status:'dodata'}).count().exec( (err, news)=>{
            if(err) console.log(err)
            else{res.json(news);}
        })
        
    }
    getocenazaknjigu  = (req: express.Request, res: express.Response) =>{
        let id=req.body.id
        KnjigeModel.findOne({'id': id}, (err, user)=>{
            if(err) console.log(err);
            else{ 
                res.json(user.ocena)
            }
        })             
    }

    searcchbooknapredna= (req: express.Request, res: express.Response)=>{
        let autor=req.body.autor;
        let naziv=req.body.naziv;
        let zanr=req.body.zanr;
        let godinaod=req.body.godinaod;
        let godinado=req.body.godinado;
        let izdavac=req.body.izdavac;       
        KnjigeModel.find(
        {
          $and: [
            {godina: { $gt:godinaod, $lt: godinado }},
            {autor: { $regex: autor, $options: "i" }},
            {zanr: { $regex: zanr, $options: "i" }},
            {naziv: { $regex: naziv, $options: "i" }},          
            {izdavac: { $regex: izdavac, $options: "i" } },
            {status:'dodata'}
          ],
        },
        (err, resp) => {
          if (err){console.log(err);}
          else  {res.json(resp);}
        }
      );
    }

    searchBooksOneParam = (req: express.Request, res: express.Response)=>{
        let searchParam = Number(req.body.searchParam);
        KnjigeModel.findOne({'id':searchParam}, (err, news)=>{
            if(err) console.log(err)
            else{res.json(news);}
        })
    }

    dodajKnjigu = (req: express.Request, res: express.Response)=>{   
        
        let User = new KnjigeModel({
            naziv: req.body.naziv,
            autor: req.body.autor,
            jezik: req.body.jezik,
            godina: req.body.godina,
            izdavac:req.body.izdavao,
            zanr:req.body.zanr,
            id:Number(req.body.id),
            slika:req.body.slika,
            ocena:0,
            stanje:3,
            zaduzena:0,
            preuzimana:0,
            status:'dodata'
        })  
        User.save().then(us=>{
            res.status(200).json({'message':'ok'})
        }).catch(err=>{res.status(200).json({'message':'error'})})
          
    }  
    getknjigeusers= (req: express.Request, res: express.Response)=>{
        let user = req.body.user;
        KnjigeModel.find({'user':user,'status':'dodata'}, (err, news)=>{
            if(err) console.log(err)
            else{res.json(news);}
        })
    }

    dodajKnjiguZahtev = (req: express.Request, res: express.Response)=>{   
                
        let User = new KnjigeModel({
            naziv: req.body.naziv,
            autor: req.body.autor,
            jezik: req.body.jezik,
            godina: req.body.godina,
            izdavac:req.body.izdavao,
            zanr:req.body.zanr,
            id:Number(req.body.id),
            slika:req.body.slika,
            ocena:0,
            user:req.body.user,
            stanje:3,
            zaduzena:0,
            preuzimana:0,
            status:'zahtev'
        })  
        User.save().then(us=>{
            res.status(200).json({'message':'ok'})
        }).catch(err=>{res.status(200).json({'message':'error'})})
           
    }

    popularnetri = (req: express.Request, res: express.Response) => {
        KnjigeModel.find({'status':'dodata'}, (err, resp) => {
          if (err) console.log(err);
          else res.json(resp);
        })
          .sort({ preuzimanja: -1 })
          .limit(3);
      };

      getknjigaid = (req: express.Request, res: express.Response) => {
        let idKnjige=req.body.idKnjige
        KnjigeModel.findOne({'idKnjige':idKnjige}, (err, resp) => {
          if (err) console.log(err);
          else res.json(resp);
        })
          .sort({ preuzimanja: -1 })
          .limit(3);
      };
    
    dodajKnjiguSlika = (req: express.Request, res: express.Response)=>{        
             
        let User = new KnjigeModel({
            naziv: req.body.naziv,
            autor: req.body.autor,
            jezik: req.body.jezik,
            godina: req.body.godina,
            izdavac:req.body.izdavao,
            zanr:req.body.zanr,
            id:req.body.id,
            slika:"",
            ocena:0,
            stanje:3,
            zaduzena:0,
            preuzimana:0,
            status:'dodata'
        })  
        User.save().then(us=>{
            res.status(200).json({'message':'ok'})
        }).catch(err=>{res.status(200).json({'message':'error'})})
          
    }

    idposlednje= (req: express.Request, res: express.Response) => {
        KnjigeModel.findOne({}).sort({ id: -1 }).limit(1).exec( (err, resp) => {
          if (err) console.log(err);
          else res.json(resp);
        });
      };

    dodajKnjiguSlikaZahtev = (req: express.Request, res: express.Response)=>{        
        console.log(11) 
        let User = new KnjigeModel({
            naziv: req.body.naziv,
            autor: req.body.autor,
            jezik: req.body.jezik,
            godina: req.body.godina,
            izdavac:req.body.izdavao,
            zanr:req.body.zanr,
            id:req.body.id,
            slika:req.body.slika,
            ocena:0,
            stanje:3,
            user:req.body.user,
            zaduzena:0,
            preuzimana:0,
            status:'zahtev'
        })  
        User.save().then(us=>{
            res.status(200).json({'message':'ok'})
        }).catch(err=>{res.status(200).json({'message':'error'})})
            
         
    }

    updateBook = (req: express.Request, res: express.Response)=>{
        let naziv=req.body.naziv;
        let autor=req.body.autor;
        let broj=req.body.broj;
        let godina=req.body.godina;
        let zanr=req.body.zanr;
        let jezik=req.body.jezik;
        let slika=req.body.slika;
        let id=Number(req.body.id);
        let izdavao=req.body.izdavao;
        console.log(slika)
        KnjigeModel.updateOne({'id':id},{$set:{'naziv':naziv,'autor':autor,'stanje':broj,'godina':godina,'zanr':zanr,'izdavac':izdavao,'jezik':jezik,'slika':slika}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Azurirano'})
        })
                
    }
    updateBookSlika = (req: express.Request, res: express.Response)=>{
        let naziv=req.body.naziv;
        let autor=req.body.autor;
        let stanje=req.body.broj;
        let godina=req.body.godina;
        let zanr=req.body.zanr;
        let izdavao=req.body.izdavao;
        let jezik=req.body.jezik;
        let id=Number(req.body.id);
                KnjigeModel.updateOne({'id':id},{$set:{'naziv':naziv,'autor':autor,'stanje':stanje,'godina':godina,'zanr':zanr,'jezik':jezik,'izdavac':izdavao}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Azurirano'})
        })  
    }
    updatebookstatus= (req: express.Request, res: express.Response)=>{
        let id=Number(req.body.id);
        let status='dodata'
        KnjigeModel.updateOne({'id':id},{$set:{'status':status}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Odobreno'})
        })
    }
    
        
            
}