import { Router } from "express";
import { carCollectionsManager } from "../dao/managers/carCollectionsManager.js";

const router = Router();
const manager = new carCollectionsManager();


router.post('/', async(req, res, next)=>{
    let  data = req.body;
    let process = await manager.createCollection(data);
    if(process){
        return res.status(200).json({error: null, data : process});
    }
})

router.put('/', async(req,res,next)=>{
    let {cid} = req.query;
    let newCarId = req.body;
    let collection = await manager.getCollection(cid);
    if(collection.length>0){
        let carsInCollection = collection[0].cars;
        carsInCollection.push(newCarId);
        let process = await manager.updateCarList(carsInCollection,cid);
        if(process){
            return res.status(200).json({error: null, data : process});
        }else{
            return res.status(500).json({error: 'COULDNT ADD CAR TO COLLECTION', data : null});
        }
    }else{
        return res.status(500).json({error: 'COLLECTION DOES N0T EXIST', data : null})
    }
})


export default router;