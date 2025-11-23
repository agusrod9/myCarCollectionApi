import { Router } from "express";
import { carManager } from "../dao/managers/cars.manager.js";
import * as carsController from "../controllers/cars.controller.js";

const router = Router();
const manager = new carManager();

router.get("/", async (req, res, next) => {
  let filters = {};
  let { id, make, model, manuf, userId, onlyRecent } = req.query;

  if (onlyRecent == "t" && userId) {
    let cars = await manager.readUserRecentlyAddedCars(userId);
    if (cars) {
      return res.status(200).json({ error: null, data: cars });
    } else {
      return res.status(400).json({ error: "NO CAR FOUND" });
    }
  }

  if (manuf)
    filters.manufacturer = { $regex: ".*" + manuf + ".*", $options: "i" };
  if (make) filters.carMake = { $regex: ".*" + make + ".*", $options: "i" };
  if (model) filters.carModel = { $regex: ".*" + model + ".*", $options: "i" };
  if (userId) filters.userId = userId;
  if (id) filters._id = id;

  if (Object.keys(filters).length > 0) {
    let cars = await manager.readCarsByFilters(filters);
    if (cars) {
      return res.status(200).json({ error: null, data: cars });
    } else {
      return res
        .status(400)
        .json({ error: "NO CAR MATCHES GIVEN PARAMETERS", data: [] });
    }
  } else {
    let cars = await manager.readAllCars();
    if (cars) {
      return res.status(200).json({ error: null, data: cars });
    } else {
      return res.status(400).json({ error: "NO CAR FOUND", data: [] });
    }
  }
});

router.post("/", carsController.createCar);

router.put("/:id", carsController.updateCar);

router.delete("/:id", carsController.deleteCar);

export default router;
