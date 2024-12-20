import { Router } from "express";
import { feedsManager } from "../dao/managers/feedsManager.js";

const router = Router();
const manager = new feedsManager();

router.get('/', async(req, res, next)=>{
    let {userId} = req.query;
    let userFeed = await manager.readFeedByUserId(userId);
});

