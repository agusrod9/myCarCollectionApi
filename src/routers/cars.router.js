import { Router } from "express";
import { carManager } from "../dao/managers/carsManager.js";

const router = Router();
const manager = new carManager();


router.get('/', async(req,res,next)=>{
    const cars = await manager.readAllCars();
    res.status(200).send({cars})
})

export default router