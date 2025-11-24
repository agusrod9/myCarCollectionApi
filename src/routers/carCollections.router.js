import { Router } from "express";
import * as carCollectionsController from '../controllers/carCollections.controller.js'

const router = Router();

router.post('/', carCollectionsController.createCarCollection);

router.get('/', carCollectionsController.readCarCollections);

router.put('/', carCollectionsController.updateCarCollection);

router.delete('/', carCollectionsController.deleteCarCollection);

export default router;