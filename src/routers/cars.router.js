import { Router } from 'express';
import { carManager } from '../dao/managers/carsManager.js';
import {carCollectionsManager} from '../dao/managers/carCollectionsManager.js'

const router = Router();
const manager = new carManager();
const collectionsManager = new carCollectionsManager();

router.get('/', async(req,res,next)=>{
    let filters = {};
    let {id, make, model, manuf, userId} = req.query;

    if (manuf) filters.manufacturer = {$regex: '.*' + manuf + '.*', $options : 'i'};
    if (make) filters.carMake = {$regex: '.*' + make + '.*', $options : 'i'};
    if (model) filters.carModel = {$regex: '.*' + model + '.*', $options : 'i'};
    if(userId) filters.userId = userId;
    if (id) filters._id = id;
    
    if(Object.keys(filters).length>0){
        let cars = await manager.readCarsByFilters(filters);
        if(cars){
            return res.status(200).json({error: null, data : cars});
        }else{
            return res.status(400).json({error: "NO CAR MATCHES GIVEN PARAMETERS", data: []});
        }
    }else{
        let cars = await manager.readAllCars();
        if(cars){
            return res.status(200).json({error: null, data : cars});
        }else{
            return res.status(400).json({error: "NO CAR FOUND", data: []});
        }
    }
    
});

router.post('/', async(req, res, next)=>{
    if(req.body.carMake && req.body.carModel && req.body.scale && req.body.userId){
        let newCar = {
            ...req.body,
            dateAdded : Date.now() //--> ignore if date is tried to set from outside.
        };
        newCar.userId = {_id : newCar.userId};
        let process = await manager.createNewCar(newCar);
        if(process){
            if(process.collectionId){
                const collectionId= process.collectionId.toString();
                const collection = await collectionsManager.getCollectionById(collectionId);
                collection.push(process._id);
                const updateCollection = await collectionsManager.updateCarList(collection,collectionId)
                if(updateCollection){
                    return res.status(201).json({error: null, data: process});
                }
            }
            return res.status(201).json({error: null, data: process});
        }else{
            return res.status(500).json({error: "CAR NOT ADDED", data: []});
        }
    }else{
        return res.status(400).json({error: "MISSING MANDATORY FIELDS", data: []});
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
                return res.status(200).json({error: null, data: process});
            }else{
                return res.status(500).json({error: "CAR NOT UPDATED", data: []});
            }
        }else{
            return res.status(400).json({error: "CAR NOT FOUND", data: []});
        }
    }else{
        return res.status(400).json({error: "MISSING MANDATORY FIELDS", data: []});
    }
    
})

router.delete('/:id', async(req,res,next)=>{
    let {id} = req.params;
    const process = await manager.deleteById(id);
    if(process){
        if(process.collectionId){
            const collectionId= process.collectionId.toString();
            const collection = await collectionsManager.getCollectionById(collectionId);
            const carsInCollection = collection[0].cars
            let indexOfCarInCollection = -1;
            for(let i=0; i< carsInCollection.length;i++){
                if(collection[0].cars[i] == id){
                    indexOfCarInCollection = i;
                }
            }
            if(indexOfCarInCollection!=-1){
                carsInCollection.splice(indexOfCarInCollection, 1)
                await collectionsManager.updateCarList(carsInCollection,collectionId)
            }
        }
        return res.status(200).json({error: null, data: process});
    }else{
        return res.status(400).json({error: "CAR NOT DELETED", data: []});
    }
})

export default router