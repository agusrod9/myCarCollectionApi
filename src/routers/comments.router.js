import { Router } from 'express';
import commentsManager from '../dao/managers/commentsManager.js';

const router = Router();
const manager = new commentsManager();

router.get('/', async(req, res, next)=>{
    let {postId} = req.query;
    const comments = await manager.readCommentsByPostId(postId);
    return res.status(200).json({error: null, data: comments})
})

