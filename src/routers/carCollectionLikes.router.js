import { Router } from "express";
import * as carCollectionLikesController from '../controllers/carCollectionLikes.controller.js';

const router = Router();

router.post('/', carCollectionLikesController.createCarCollectionLike)

router.get('/:collectionId', carCollectionLikesController.readCarCollectionLikesByCarCollectionId)

router.delete('/', carCollectionLikesController.deleteCarCollectionLike)

export default router;