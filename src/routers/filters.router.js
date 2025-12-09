import { Router } from "express";
import * as filtersController from '../controllers/filters.controller.js'

const router = Router();

router.get("/", filtersController.readUserAvailableFilters)

export default router
