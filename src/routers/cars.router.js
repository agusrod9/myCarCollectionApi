import { Router } from "express";
import { carManager } from "../dao/managers/carsManager.js";
import { validateHexColor } from "../utils/validator.util.js";

const router = Router();
const manager = new carManager();

router.get("/",async (req, res, next) => {
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

router.post("/", async (req, res, next) => {
  if (
    req.body.carMake &&
    req.body.carModel &&
    req.body.scale &&
    req.body.userId
  ) {
    let newCar = {
      ...req.body,
      dateAdded: Date.now(), 
    };
    if (!validateHexColor(newCar.carColor)) {
      return res
        .status(400)
        .json({ error: "COLOR MUST BE IN HEX FORMAT", data: [] });
    }
    newCar.userId = { _id: newCar.userId };
    let process = await manager.createNewCar(newCar);
    if (process) {
      if(process.price===null){
        return res.status(201).json({ error: null, data: process});
      }else{
        const addedCarWithCurrencyInfo = await manager.model.aggregate([
          {$match: {_id: process._id}},
          {
            $lookup:{
              from: "currencies",
              localField: "price.currency",
              foreignField: "_id",
              as: "currencyInfo"
            }
          },
          {$unwind: "$currencyInfo"},
          {
            $project: {
              carYear:1,
              manufacturer: 1,
              scale: 1,
              notes: 1,
              opened: 1,
              series: 1,
              series_num: 1,
              collectionId: 1,
              carMake: 1,
              carModel: 1,
              carColor: 1,
              img_urls: 1,
              userId: 1,
              price: 1,
              dateAdded: 1,
              currencyInfo: {
                id: "$currencyInfo._id",
                code: "$currencyInfo.code",
                name: "$currencyInfo.name",
                symbol: "$currencyInfo.symbol",
                flag: "$currencyInfo.flag",
                country: "$currencyInfo.country"
              }
            }
          }
        ])
        return res.status(201).json({ error: null, data: addedCarWithCurrencyInfo[0] });
        }
      
    } else {
      return res.status(500).json({ error: "CAR NOT ADDED", data: [] });
    }
  } else {
    return res
      .status(400)
      .json({ error: "MISSING MANDATORY FIELDS", data: [] });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    const {_id, dateAdded, userId,  ...newData} = req.body;
    
    const car = await manager.readCarById(id);
    if (car) {
      Object.entries(newData).forEach(([key, value])=>{
        car[key] = newData[key]
      })
      let process = await manager.updateCar(id, car);
      if (process) {
        return res.status(200).json({ error: null, data: process });
      } else {
        return res.status(500).json({ error: "CAR NOT UPDATED", data: null });
      }
    } else {
      return res.status(400).json({ error: "CAR NOT FOUND", data: [] });
    }
  } catch (error) {
    throw error;
  }
}
);

router.delete("/:id", async (req, res, next) => {
  let { id } = req.params;
  const process = await manager.deleteById(id);
  if (process) {
    return res.status(200).json({ error: null, data: process });
  } else {
    return res.status(400).json({ error: "CAR NOT DELETED", data: [] });
  }
});

export default router;
