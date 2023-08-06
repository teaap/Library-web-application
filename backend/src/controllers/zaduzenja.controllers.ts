import express from 'express'
import zaduzenja from '../models/zaduzenja'
import ZaduzenjaModel from '../models/zaduzenja'

export class ZaduzenjaController{
    dodajZaduzenje = (req: express.Request, res: express.Response)=>{
        
        let User = new ZaduzenjaModel({
            idKnjige: req.body.id,
            broj: 0,
            username:  req.body.username,
            aktivan: true,
            produzio: false,
            datumOd:  req.body.datumOd,
            datumDo: req.body.datumDo
        })       
        User.save().then(User=>{
            res.json({'message':'Uspesno'})
                }).catch(err=>{
                res.status(400).json({'message':'Greska, baza'})
                })
    }

    findactiveusername = (req: express.Request, res: express.Response)=>{
        let username=req.body.username
        ZaduzenjaModel.find({'aktivan':true,'username':username}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
        })
    }

    findactiveidusername = (req: express.Request, res: express.Response)=>{
        let username=req.body.username
        let id=req.body.idKnjige
        ZaduzenjaModel.findOne({'aktivan':true,'username':username,'idKnjige':id}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
        })
    }

    

    findnoactiveusername = (req: express.Request, res: express.Response)=>{
        let username=req.body.username
        ZaduzenjaModel.find({'aktivan':false,'username':username}, (err, news)=>{
            if(err) console.log(err)
            else res.json(news)
        })
    }

    updaterazduzi= (req: express.Request, res: express.Response)=>{
        let idKnjige=req.body.idKnjige;
        let username=req.body.username;
    
        ZaduzenjaModel.updateMany({'username': username,'idKnjige':idKnjige},
                                  {$set: {'aktivan': 'false','datumDo':new Date()}}, (err, resp)=>{
            if(err) {console.log(err)
            console.log('da');}
            else{res.json({'message': 'updated'});}
        })
    } 
 
    updatezaduzenjaproduzi= (req: express.Request, res: express.Response)=>{
        let idKnjige=req.body.idKnjige;
        let username=req.body.username;
        let datumDo=new Date(req.body.datumDo);
    
        ZaduzenjaModel.updateOne({'username': username,'idKnjige':idKnjige}, {$set: {'produzio': 'true','datumDo': datumDo}}, (err, resp)=>{
            if(err) {console.log(err)
            console.log('da');}
            else{res.json({'message': 'updated'});}
        })
    }   
}