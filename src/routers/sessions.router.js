import { Router } from "express";
import { userManager } from "../dao/managers/userManager.js";

const router = Router();

const manager = new userManager();

router.get('/', async(req,res,next)=>{
    const users = await manager.readAllUsers();
    res.status(200).send({users})
})

export default router