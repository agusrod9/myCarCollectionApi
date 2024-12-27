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


export default router;