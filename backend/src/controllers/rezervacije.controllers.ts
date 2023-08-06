import express from 'express'
import RezervacijaModel from '../models/rezervacije'

export class RezervacijaController{
   dodajrezervaciju = (req: express.Request, res: express.Response)=>{

    RezervacijaModel.find({}).count().exec((err,num)=>{
        let User = new RezervacijaModel({
            username: req.body.username,
            id:  Number(num),
            idKnjige: req.body.idKnjige,
            aktivan:'true',
            obavesten:'false'
        })       
        User.save().then(User=>{
                res.json({'message':'Knjiga nije na stanju, uspesno je rezervisana'})
                }).catch(err=>{
                res.status(400).json({'message':'Greska, baza'})
                })
        })
    }
    getrezervacija=(req: express.Request, res: express.Response)=>{
        let idKnjige=req.body.idKnjige;
        let username=req.body.username
        RezervacijaModel.findOne({'idKnjige':idKnjige,'username':username,'aktivan':'true'}, (err, news)=>{
                if(err) console.log(err)
                else res.json(news)
            })
    } 
    getobavestenje=(req: express.Request, res: express.Response)=>{
        let username=req.body.username
        RezervacijaModel.find({'username':username,'aktivan':'false','obavesten':'false'}, (err, news)=>{
                if(err) console.log(err)
                else res.json(news)
            })
    } 
    promeniaktivan=(req: express.Request, res: express.Response)=>{
        let idKnjige=req.body.idKnjige;
        let username=req.body.username
        RezervacijaModel.updateOne({'idKnjige':idKnjige,'username':username,$set:{'aktivan':'false'}}, (err, news)=>{
                if(err) console.log(err)
                else res.json(news)
            })
    }
    promeniobavesten=(req: express.Request, res: express.Response)=>{
        let idKnjige=req.body.idKnjige;
        let username=req.body.username
        console.log(idKnjige,username)
        RezervacijaModel.updateOne({'idKnjige':idKnjige,'username':username},{$set:{'obavesten':'true'}}, (err, news)=>{
                if(err) console.log(err)
                else res.json(news)
            })
    }
    getrezervacijaid=(req: express.Request, res: express.Response)=>{
        let idKnjige=req.body.idKnjige;
        RezervacijaModel.find({'idKnjige':idKnjige,'aktivan':'true'}, (err, news)=>{
                if(err) console.log(err)
                else res.json(news)
            })
    } 
        
}
        
            
  