import { Router } from "express";
import * as carsController from "../controllers/cars.controller.js";

const router = Router();

router.post("/", carsController.createCar);

router.get("/", carsController.readCars);

router.put("/:id", carsController.updateCar);

router.delete("/:id", carsController.deleteCar);

export default router;
