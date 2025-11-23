import { Router } from "express";
import * as carsController from "../controllers/cars.controller.js";

const router = Router();

router.get("/", carsController.readCars);

router.post("/", carsController.createCar);

router.put("/:id", carsController.updateCar);

router.delete("/:id", carsController.deleteCar);

export default router;
