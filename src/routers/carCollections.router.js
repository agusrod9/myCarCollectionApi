import { Router } from "express";
import { carCollectionsManager } from "../dao/managers/carCollectionsManager.js";
import { carManager } from "../dao/managers/carsManager.js";

const router = Router();
const manager = new carCollectionsManager();
const carsManager = new carManager

router.get('/', async(req,res,next)=>{
    let {userId, cid} = req.query;
    if(cid){
        const collection = await manager.getCollectionById(cid);
        if (collection){
            return res.status(200).json({error: null, data : collection});
        }else{
            return res.status(404).json({error: "COLLECTION NOT FOUND", data: null});
        }
    }
    let collections = []
    if(userId){
        collections = await manager.getCollectionsByUserId(userId);
    }else{
        collections = await manager.getAllCollections();
    }
    
    if(collections.length>0){
        return res.status(200).json({error: null, data : collections});
    }else{
        return res.status(404).json({error: "NO COLLECTIONS FOUND", data: null});
    }
})

router.post('/', async(req, res, next)=>{
    let  data = req.body;
    let process = await manager.createCollection(data);
    if(process){
        return res.status(201).json({error: null, data : process});
    }
})

router.put('/', async(req,res,next)=>{
    let {cid} = req.query;
    const {_id, userId, dateAdded, ...newData} = req.body;
    let collection = await manager.getCollectionById(cid);
    if(collection){
        Object.entries(newData).forEach(([key, value])=>{
            collection[key] = newData[key]
        })
        let process = await manager.updateCollectionById(cid, collection);
        if (process){
            return res.status(200).json({ error: null, data: process });
        } else {
            return res.status(500).json({ error: "COLLECTION NOT UPDATED", data: [] });
        }
    }else{
        return res.status(404).json({error: 'COLLECTION DOES NOT EXIST', data : null})
    }
})

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