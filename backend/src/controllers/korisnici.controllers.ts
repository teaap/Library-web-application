import express from 'express'
import korisnici from '../models/korisnici'
import KorisniciModel from '../models/korisnici'

export class KorisniciController{
    getPicture  = (req: express.Request, res: express.Response) =>{
        let slika = req.body.slika;
        var path = require('path');
       
        let lastindex = __dirname.lastIndexOf(path.sep);
        lastindex = __dirname.lastIndexOf(path.sep, lastindex - 1);
        let parentFolder = __dirname.substr(0,lastindex);
        res.sendFile(`${parentFolder}${path.sep}slike${path.sep}${slika}`)
       
    }

    getAllUsers = (req: express.Request, res: express.Response)=>{
        KorisniciModel.find({}, (err, books)=>{
            if(err) console.log(err)
            else res.json(books)
        })

    }

    register = (req: express.Request, res: express.Response)=>{
        KorisniciModel.findOne({'username':req.body.username},(err,user)=>{
            if(err) console.log(err)
            else{
                if(user==null){
                KorisniciModel.findOne({'email':req.body.email},(err,user)=>{
                    if(err)console.log(err)
                    else{
                        KorisniciModel.find({}).count().exec((err,num)=>{
                            if(err) console.log(err);
                            else{         
                        if(user==null){
                            let User = new KorisniciModel({
                                id: num,
                                adresa: req.body.adresa,
                                email: req.body.email,
                                ime: req.body.ime,
                                prezime: req.body.prezime,
                                lozinka: req.body.lozinka,
                                telefon:req.body.telefon,
                                slika: req.body.slika,
                                status:'novi',
                                tip: 'citalac',
                                zaduzeno: 0,
                                username: req.body.username
                            })       
                        User.save().then(User=>{
                            console.log(User.id);
                            res.json({'message':'Uspesno'})
                             }).catch(err=>{
                                res.status(400).json({'message':'Greska, baza'})
                                })
                         }else{
                            res.status(400).json({'message':'Email je vec u bazi'})
                        }
                    } }) 
                }
            })
        }else  res.status(400).json({'message':'Korisnik sa datim korisnickim imenom vec postoji'})
        }
      })
    }

    deletekorisnika = (req: express.Request, res: express.Response)=>{
        let idN = req.body.idN;

        KorisniciModel.deleteOne({'id': idN}, (err, resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }

    regslika = (req: express.Request, res: express.Response)=>{
        KorisniciModel.findOne({'username':req.body.username},(err,user)=>{
            if(err) console.log(err)
            else{
                if(user==null){
                KorisniciModel.findOne({'email':req.body.email},(err,user)=>{
                    if(err)console.log(err)
                    else{
                        KorisniciModel.find({}).count().exec((err,num)=>{
                            if(err) console.log(err);
                            else{         
                                if(user==null){     
                                    let User = new KorisniciModel({
                                        id: num,
                                        adresa: req.body.adresa,
                                        email: req.body.email,
                                        ime: req.body.ime,
                                        prezime: req.body.prezime,
                                        lozinka: req.body.lozinka,
                                        telefon:req.body.telefon,
                                        slika: "",
                                        status:'novi',
                                        tip: 'citalac',
                                        zaduzeno: 0,
                                        username: req.body.username
                                        })       
                                    User.save().then(User=>{
                                        res.status(400).json({'message':'Uspesno'})
                                        }).catch(err=>{
                                            res.status(400).json({'message':'Greska, baza'})
                                        })
                                    }else{
                                        res.status(400).json({'message':'Email je vec u bazi'})
                                    }
                                   } }) 
                               }
                           })
                       }else  res.status(400).json({'message':'Korisnik sa datim korisnickim imenom vec postoji'})
                       }
                     })
                   }
    
    login = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let lozinka = req.body.lozinka;

        KorisniciModel.findOne({'username': username, 'lozinka': lozinka, 'tip':{$ne:'admin'},status:{$ne:'novi'}}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
    loginAdmin = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let lozinka = req.body.lozinka;

        KorisniciModel.findOne({'username': username, 'lozinka': lozinka, 'tip':'admin'}, (err, user)=>{
            if(err) console.log(err);
            else res.json(user)
        })
    }
    dohvatiKorisnika= (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let lozinka = req.body.lozinka;

        KorisniciModel.findOne({'username': username, 'lozinka': lozinka}, (err, user)=>{
            if(err) console.log(err);
            else{if(user!=null) res.json('Pronadjen'); else res.json('Nepronadjen');}
        })
    }
  
    updateKorisnikZaduzenja= (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        KorisniciModel.findOne({'username': username}, (err, user)=>{
            if(err) console.log(err);
            else{if(user!=null){
                if(user.zaduzeno==3){res.json({'message': 'ima3'})}
                else{
                    let novi=user.zaduzeno+1;
                    KorisniciModel.updateOne({'username': username},{$set:{'zaduzeno':novi}}, (err, resp)=>{
                        if(err) console.log(err)
                        else res.json({'message': 'updated'})
                    })
                }

            }}
        })
    }
   

    updateKorisnikrazaduzenja= (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        KorisniciModel.findOne({'username': username}, (err, user)=>{
            if(err) console.log(err);
            else{if(user!=null){
                let novi=user.zaduzeno-1;
                KorisniciModel.updateOne({'username': username},{$set:{'zaduzeno':novi}}, (err, resp)=>{
                    if(err) console.log(err)
                    else res.json({'message': 'updated'})
                })
            }}
        })
    }
    promeniLozinku = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        let lozinka = req.body.lozinka;
        KorisniciModel.updateOne({'username': username},{$set:{'lozinka':lozinka}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'updated'})
        })

       /* NewsModel.updateOne({'id': id}, {$set: {"comments.$[comment].text": "News comment text"}}, {arrayFilters: [{
            "comment.text": "Comment 3"
        }]}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })*/
    }
    
    updateKorisnik = (req: express.Request, res: express.Response)=>{
        let ime=req.body.ime;
        let prezime=req.body.prezime;
        let usernameNew=req.body.username;
        let adresa=req.body.adresa;
        let email=req.body.email;
        let telefon=req.body.telefon;
        let slika=req.body.slika;
        let id=req.body.id;
        console.log(id)
        console.log(55)
        KorisniciModel.updateOne({'username':usernameNew},{$set:{'ime':ime,'prezime':prezime,'adresa':adresa,'email':email,'telefon':telefon,'slika':slika}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Azurirano'})
        })
                
    }
    updateKorisnikSlika = (req: express.Request, res: express.Response)=>{
        let ime=req.body.ime;
        let prezime=req.body.prezime;
        let usernameNew=req.body.username;
        let adresa=req.body.adresa;
        let email=req.body.email;
        let telefon=req.body.telefon;
        let id=req.body.id;
        KorisniciModel.updateOne({'username':usernameNew},{$set:{'ime':ime,'prezime':prezime,'adresa':adresa,'email':email,'telefon':telefon}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'Azurirano'})
        })
                
    }
    dohvatiKorisnikausername= (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        KorisniciModel.findOne({'username': username}, (err, user)=>{
            if(err) console.log(err);
            else{if(user!=null) res.json('Pronadjen'); else res.json('Nepronadjen');}
        })
    }
    getUserUsername= (req: express.Request, res: express.Response)=>{
        let username = req.body.username;

        KorisniciModel.findOne({'username': username}, (err, user)=>{
            if(err) console.log(err);
            else{ res.json(user); }
        })
    }
    updateBlok = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        KorisniciModel.updateOne({'username': username}, {$set: {'status': 'blokiran'}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'updated'})
        })
    }
    updateOdBlok = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        KorisniciModel.updateOne({'username': username}, {$set: {'status': 'odobren'}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'updated'})
        })
    }
    updateNovi = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        KorisniciModel.updateOne({'username': username}, {$set: {'status': 'odobren'}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'updated'})
        })
    }
    updateUModer = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        KorisniciModel.updateOne({'username': username}, {$set: {'tip': 'moderator'}}, (err, resp)=>{
            if(err) {console.log(err)
            console.log('da');}
            else res.json({'message': 'updated'})
        })
    }
    updateUCit = (req: express.Request, res: express.Response)=>{
        let username = req.body.username;
        KorisniciModel.updateOne({'username': username}, {$set: {'tip': 'citalac'}}, (err, resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'updated'})
        })
    }
    
}