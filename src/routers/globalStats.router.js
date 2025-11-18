import { Router } from "express";
import { globalStatsManager } from "../dao/managers/globalStats.manager.js";

const router = Router();
const manager = new globalStatsManager();

router.get("/", async(req, res, next)=>{
    try {
        const stats = await manager.getStats();
        return res.status(200).json({error : null, data : stats});
    } catch (error) {
        next(error)
    }

});

router.put("/", async(req, res, next)=>{
    try {
        const {} = req.body;
    } catch (error) {
        next(error)
    }
});

export default router;