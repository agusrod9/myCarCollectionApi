import { Router } from "express";
import * as collectorsController from '../controllers/collectors.controller.js';


const router = Router();

router.get('/:userName', collectorsController.readCollectorByUserName)

export default router