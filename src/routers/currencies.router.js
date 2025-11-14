import { Router } from "express";
import { currenciesManager } from "../dao/managers/currencies.manager.js";

const router = Router();
const manager = new currenciesManager();

router.get("/", async(req, res, next)=>{
    let {id, code} = req.query;

    if(id){
        const currency = await manager.readCurrencyById(id);
        if(currency){
            return res.status(200).json({ error: null, data: currency });
        }else{
            return res.status(400).json({ error: "NO CURRENCY FOUND" });
        }
    }else{
        if(code){
            const currency = await manager.readCurrencyByCode(code);
            if(currency){
                return res.status(200).json({ error: null, data: currency });
            }else{
                return res.status(400).json({ error: "NO CURRENCY FOUND" });
            }
        }else{
            const currencies = await manager.readAllCurrencies();
            if(currencies && currencies.length>0){
                return res.status(200).json({ error: null, data: currencies });
            }else{
                return res.status(400).json({ error: "NO CURRENCY FOUND" });
            }
        }
    }
});

router.post("/", async(req,res,next)=>{
    if(!req.body.name || !req.body.symbol || !req.body.country || !req.body.flag || !req.body.code){
        return res.status(400).json({ error: "MISSING MANDATORY FIELDS", data: [] });
    }
    const newCurrency = req.body;
    const process = await manager.createCurrency(newCurrency);
    if(process){
        return res.status(201).json({ error: null, data: process });
    }else{
        return res.status(500).json({ error: "CURRENCY NOT ADDED", data: [] });
    }
})


export default router;