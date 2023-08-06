import express from 'express'
import knjige from '../models/knjige'
import ZahtevModel from '../models/zahtevi'

export class ZahteviController{
   dodajZahtev = (req: express.Request, res: express.Response)=>{
        let User = new ZahtevModel({
                username: req.body.username,
                id:  req.body.id,
                spreman: true
        })       
        User.save().then(User=>{
                res.json({'message':'Uspesno'})
                }).catch(err=>{
                res.status(400).json({'message':'Greska, baza'})
                })
        }
        getallzahtevi=(req: express.Request, res: express.Response)=>{
                ZahtevModel.find({}, (err, news)=>{
                        if(err) console.log(err)
                        else res.json(news)
                    })
        }
        getzahtevid=(req: express.Request, res: express.Response)=>{
                let id=req.body.id;
                ZahtevModel.findOne({'id':id}, (err, news)=>{
                        if(err) console.log(err)
                        else res.json(news)
                    })
        }
        delete = (req: express.Request, res: express.Response)=>{
                let id = req.body.id;
        
                ZahtevModel.deleteOne({'id': id}, (err, resp)=>{
                    if(err) console.log(err);
                    else res.json({'message': 'ok'})
                })
        }

        
}
        
            
  