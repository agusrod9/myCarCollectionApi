import { Router } from "express";
import * as currenciesController from '../controllers/currencies.controller.js'

const router = Router();

router.post("/", currenciesController.createCurrency);

router.get("/", currenciesController.readCurrencies);

router.put("/:id", currenciesController.updateCurrency);

router.delete("/:id", currenciesController.deleteCurrency);

export default router;