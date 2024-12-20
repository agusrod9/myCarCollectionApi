import { Router } from "express";
import { userPostsManager } from "../dao/managers/userPostsManager.js";

const router = Router();
const manager = new userPostsManager();

router.get('/', async(req, res, next)=>{
    let {userId} = req.query;
    let posts = manager.readAllPostsByUserId(userId);
    return posts;
});