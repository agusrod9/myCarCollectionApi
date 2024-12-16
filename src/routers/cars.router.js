import { Router } from "express";
import { carManager } from "../dao/managers/carsManager.js";

const router = Router();
const manager = new carManager();

router.get('/:id?:mod?', async(req,res,next)=>{
    let {mod} = req.query;
    let {id} = req.query;

    if(mod){
        const cars = await manager.readCarsByModel(mod);
        res.status(200).send({error: null, data : cars})
    }else{
        if(id){
            const car = await manager.readCarById(id);
            res.status(200).send({error: null, data : car})
        }else{
            const cars = await manager.readAllCars();
            res.status(200).send({error: null, data : cars})
        }
    }
});

router.post('/', async(req, res, next)=>{
    if(req.body.model && req.body.img_url && req.body.series && req.body.series_num && req.body.userId && req.body.year){
        let newCar = req.body;
        newCar.user = {_id : newCar.user};
        let process = await manager.createNewCar(newCar);
        if(process){
            res.status(201).send({error: null, data: process});
        }else{
            res.status(500).send({error: "CAR NOT ADDED", data: []});
        }
    }else{
        res.status(400).send({error: "MISSING MANDATORY FIELDS", data: []});
    }
})

export default router