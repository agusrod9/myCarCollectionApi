import { Router } from "express";
import { carManager } from "../dao/managers/carsManager.js";

const router = Router();
const carsManager = new carManager();

router.get("/",async(req, res, next)=>{
    let {userId} = req.query;
    let userCars = await carsManager.readCarsByFilters({userId})
    let brands = await carsManager.readUserAvailableFilters({userId})
    return res.json(brands)
})

export default router
