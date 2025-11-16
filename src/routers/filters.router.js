import { Router } from "express";
import { carManager } from "../dao/managers/carsManager.js";

const router = Router();
const carsManager = new carManager();

router.get("/",async(req, res, next)=>{
    let {userId} = req.query;
    if(!userId){
        return res.status(400).json({error:'BAD REQUEST'})
    }
    let filters = await carsManager.readUserAvailableFilters({userId})
    if(filters.availableCarMakes.length!=0 && filters.availableManufacturers.length!=0 && filters.availableScales.length!=0){
        return res.status(200).json({error: null, data: filters});
    }
    return res.status(200).json({error:null, data:[]});
})

export default router
