import { Router } from "express";
import * as carLikesController from '../controllers/carLikes.controller.js';

const router = Router();

router.post('/', carLikesController.createCarLike)

router.get('/:carId', carLikesController.readCarLikesByCarId)

router.delete('/', carLikesController.deleteCarLike)

export default router;