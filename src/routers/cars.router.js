import { Router } from "express";
import { carManager } from "../dao/managers/carsManager.js";

const router = Router();
const manager = new carManager();

router.get('/', async(req,res,next)=>{
    let filters = {};
    let {id, make, model, manuf} = req.query;

    if (manuf) filters.manufacturer = {$regex: '.*' + manuf + '.*', $options : 'i'};
    if (make) filters.carMake = {$regex: '.*' + make + '.*', $options : 'i'};
    if (model) filters.carModel = {$regex: '.*' + model + '.*', $options : 'i'};
    if (id) filters._id = id;
    
    if(Object.keys(filters).length>0){
        let cars = await manager.readCarsByFilters(filters);
        if(cars){
            res.status(200).json({error: null, data : cars});
        }else{
            res.status(400).json({error: "NO CAR MATCHES GIVEN PARAMETERS", data: []});
        }
    }else{
        let cars = await manager.readAllCars();
        if(cars){
            res.status(200).json({error: null, data : cars});
        }else{
            res.status(400).json({error: "NO CAR FOUND", data: []});
        }
    }
    
});

router.post('/', async(req, res, next)=>{
    if(req.body.carMake && req.body.carModel && req.body.carYear && req.body.scale && req.body.userId){
        let newCar = req.body;
        newCar.userId = {_id : newCar.userId};
        let process = await manager.createNewCar(newCar);
        if(process){
            res.status(201).json({error: null, data: process});
        }else{
            res.status(500).json({error: "CAR NOT ADDED", data: []});
        }
    }else{
        res.status(400).json({error: "MISSING MANDATORY FIELDS", data: []});
    }
})

router.put('/:id', async(req,res,next)=>{
    let {id} = req.params;
    let modifiedCar = req.body;

    if(modifiedCar.carColor && modifiedCar.carMake && modifiedCar.carModel && modifiedCar.carYear && modifiedCar.img_urls && modifiedCar.manufacturer && modifiedCar.notes!=null && modifiedCar.opened && modifiedCar.scale && modifiedCar.series && modifiedCar.series_num){
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
                res.status(200).json({error: null, data: process});
            }else{
                res.status(500).json({error: "CAR NOT UPDATED", data: []});
            }
        }else{
            res.status(400).json({error: "CAR NOT FOUND", data: []});
        }
    }else{
        res.status(400).json({error: "MISSING MANDATORY FIELDS", data: []});
    }
    
})

router.delete('/:id', async(req,res,next)=>{
    let {id} = req.params;
    const process = await manager.deleteById(id);
    if(process){
        res.status(200).json({error: null, data: process});
    }else{
        res.status(400).json({error: "CAR NOT DELETED", data: []});
    }
})

export default router