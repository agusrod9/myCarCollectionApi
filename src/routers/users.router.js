import { Router } from "express";
import { usersManager } from "../dao/managers/usersManager.js";
import { carManager } from "../dao/managers/carsManager.js";


const router = Router();
const manager = new usersManager()
const carsManager = new carManager()

router.get('/', async(req,res,next)=>{
    try {
        const {id} = req.query;
        let usr = null;
        if(id){
            usr = await manager.readById(id);
        }else{
            usr = await manager.readAllUsers();
        }
        if(usr){
            return res.status(200).json({data:usr});
        }
        return res.status(400).json({ error: "NO USER FOUND", data: [] });
    } catch (error) {
        next(error)
    }
})

router.get('/:userId/carsValue',async(req,res,next)=>{
    try {
        const{userId} = req.params;
        const amountByCurrency = await carsManager.readUserCarsTotalAmount(userId);
        return res.status(200).json({error:null, data: amountByCurrency})
    } catch (error) {
        next(error)
    }
})

router.get('/checkNick', async(req,res,next)=>{
    try {
        const {nick} = req.query
        if(!nick){
            return res.status(400).json({error: "MISSING MANDATORY FIELDS", data: null})
        }
        const available = await manager.checkNickAvailability(nick);
        return res.status(200).json({error: null, available})

    } catch (error) {
        next(error)
    }
})

router.put('/:id', async(req,res,next)=>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).json({error: "MISSING MANDATORY FIELDS", data: null})
        }
        const{_id, ...newData} = req.body;
        const usr = await manager.readById(id);
        if(usr){
            Object.entries(newData).forEach(([key, value])=>{
                usr[key] = newData[key];
            })
            let process = await manager.updateUser(id,usr);
            if(process){
                return res.status(200).json({error: null, data: process})
            }else{
                return res.status(500).json({ error: "USER NOT UPDATED", data: null });
            }
        }
        return res.status(400).json({ error: "USER NOT FOUND", data: null });
    } catch (error) {
        next(error)
    }
})


export default router