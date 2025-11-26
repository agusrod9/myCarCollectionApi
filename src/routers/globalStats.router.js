import { Router } from "express";
import * as statsController from '../controllers/globalStats.controller.js';

const router = Router();

router.get("/", statsController.readAllStats);

router.put("/", statsController.updateStats);

router.put("/updateLanguageStats", statsController.updateLanguageStats)

export default router;