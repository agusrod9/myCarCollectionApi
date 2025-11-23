import { Router } from "express";
import * as carCollectionsController from '../controllers/carCollections.controller.js'
import { carCollectionsManager } from "../dao/managers/carCollections.manager.js";
import { carManager } from "../dao/managers/cars.manager.js";

const router = Router();
const manager = new carCollectionsManager();
const carsManager = new carManager


router.post('/', carCollectionsController.createCarCollection);

router.get('/', carCollectionsController.readCarCollections);

router.put('/', carCollectionsController.updateCarCollection);

router.delete('/', async(req, res, next)=>{
    let {cid} = req.query;
    let collection = await manager.getCollectionById(cid)
    if(collection.length>0){
        let process = await manager.deleteCollectionById(cid);
        if(process){
            let carsInCollection = collection[0].cars;
            if(carsInCollection.length>0){
                for(let car of carsInCollection){
                    await carsManager.updateCar(car,{collectionId : null});
                }
            }
            return res.status(200).json({error: null, data : process, carsAffected: carsInCollection});
        }else{
            return res.status(500).json({error: 'COULDNT DELETE COLLECTION', data : null});
        }
    }else{
        return res.status(404).json({error: 'COLLECTION DOES N0T EXIST', data : null})
    }
    
})

export default router;