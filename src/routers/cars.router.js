import { Router } from "express";
import { carManager } from "../dao/managers/carsManager.js";

const router = Router();
const manager = new carManager();

router.get('/', async(req,res,next)=>{
    let {id, make, model} = req.query;

    if(make){
        if(model){
            let carsByModel = await manager.readCarsByMakeAndModel(make, model);
            res.status(200).send({error: null, data : carsByModel});
        }else{
            let cars = await manager.readCarsByMake(make);
            res.status(200).send({error: null, data : cars});
        }
    }else if(model){
        const cars = await manager.readCarsByModel(model);
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
    if(req.body.carMake && req.body.carModel && req.body.carYear && req.body.scale && req.body.userId){
        let newCar = req.body;
        newCar.userId = {_id : newCar.userId};
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

    if(modifiedCar.carColor && modifiedCar.carMake && modifiedCar.carModel && modifiedCar.carYear && modifiedCar.img_urls && modifiedCar.manufacturer && modifiedCar.notes && modifiedCar.opened && modifiedCar.scale && modifiedCar.series && modifiedCar.series_num){
        const car = await manager.readCarById(id);
        if(car){
            car.carColor = modifiedCar.carColor;
            car.carMake = modifiedCar.carMake;
            car.carModel = modifiedCar.carModel;
            car.carYear = modifiedCar.carYear;
            car.img_urls = modifiedCar.img_urls;
            car.manufacturer = modifiedCar.manufacturer;
            car.notes = modifiedCar.notes;
            car.opened = modifiedCar.opened;
            car.scale = modifiedCar.scale;
            car.series = modifiedCar.series;
            car.series_num = modifiedCar.series_num;
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