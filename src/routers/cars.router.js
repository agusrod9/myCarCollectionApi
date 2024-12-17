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
    if(req.body.model && req.body.img_urls && req.body.series && req.body.series_num && req.body.userId && req.body.year){
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

router.put('/:id', async(req,res,next)=>{
    let {id} = req.params;
    let modifiedCar = req.body;

    if(modifiedCar.model && modifiedCar.img_urls && modifiedCar.series && modifiedCar.series_num && modifiedCar.year){
        const car = await manager.readCarById(id);
        if(car){
            car.model = modifiedCar.model;
            car.img_urls = modifiedCar.img_urls;
            car.series = modifiedCar.series;
            car.series_num = modifiedCar.series_num;
            car.year = modifiedCar.year;
            let process = await manager.updateCar(id, car);
            if(process){
                res.status(200).send({error: null, data: process});
            }else{
                res.status(500).send({error: "CAR NOT UPDATED", data: []});
            }
        }else{
            res.status(400).send({error: "CAR NOT FOUND", data: []});
        }
    }else{
        res.status(400).send({error: "MISSING MANDATORY FIELDS", data: []});
    }
    
})

router.delete('/:id', async(req,res,next)=>{
    let {id} = req.params;
    const process = await manager.deleteById(id);
    if(process){
        res.status(200).send({error: null, data: process});
    }else{
        res.status(400).send({error: "CAR NOT DELETED", data: []});
    }
})

export default router