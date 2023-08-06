import express from 'express'
import komentari from '../models/komentari'
import KomentarModel from '../models/komentari'

export class KomentariController{

    getkomenatarid  = (req: express.Request, res: express.Response) =>{
        let id=req.body.id
        KomentarModel.find({'id': id}, (err, user)=>{
            if(err) console.log(err);
            else{ 
                res.json(user)
            }
        })             
    }

    brkomzasliku= (req: express.Request, res: express.Response) =>{
        let id=req.body.id
        KomentarModel.find({'id':id}).count().exec( (err, news)=>{
            if(err) console.log(err)
            else{res.json(news);}
        })
    }
    
    updatekomenatar = (req: express.Request, res: express.Response) =>{
        let username=req.body.username
        let ocena=req.body.ocena
        let id=req.body.id
        let tekst=req.body.tekst
        let datum=new Date()
        let izmenjen=true

        KomentarModel.updateOne({'username': username,'id':id},{$set:{'ocena':ocena,'tekst':tekst,'datum':datum,'izmenjen':izmenjen}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'updated'})
        })
    }

    getkomenataridusername  = (req: express.Request, res: express.Response) =>{
        let id=req.body.id
        let username=req.body.username
        KomentarModel.findOne({'id': id,'username':username}, (err, user)=>{
            if(err) console.log(err);
            else{ 
                res.json(user)
            }
        })             
    }

    addkomentar = (req: express.Request, res: express.Response) =>{

        let username=req.body.username;
        let id=req.body.id
        let tekst=req.body.tekst
        let ocena=req.body.ocena
        let datum=new Date()

        KomentarModel.findOne({'username':username,'id':id},(err,user)=>{
            if(err) console.log(err)
            else{      
                if(user==null){            
                let User = new KomentarModel({
                    id: id,
                    username: username,
                    tekst: tekst,
                    ocena: ocena,
                    izmenjen: false,
                    lozinka: req.body.lozinka,
                    datum:datum
                    })       
                User.save().then(User=>{
                    res.json({'message':'Uspesno'})
                    }).catch(err=>{
                        res.json({'message':'Greska, baza'})
                })
                }
                else {
                    res.json({'message':'Ne mozete vise puta komentarisati'})
            }
            }
        })
    }       
            
}