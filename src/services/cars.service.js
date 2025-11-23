import { carManager } from "../dao/managers/cars.manager.js";
import { validateHexColor } from "../utils/validator.util.js";

const manager = new carManager();

export async function createCar(body) {
    if (body.carMake && body.carModel && body.scale && body.userId) {
        let newCar = { ...body, dateAdded: Date.now() };
        if (!validateHexColor(newCar.carColor)) {
            return {
                statusCode: 400,
                error: "COLOR MUST BE IN HEX FORMAT",
                data: [],
            };
        }
        let process = await manager.createNewCar(newCar);
        if (process) {
            if (process.price === null) {
                return {
                    statusCode: 201,
                    error: null,
                    data: process,
                };
            } else {
                const addedCarWithCurrencyInfo = await manager.readCarWithCurrencyInfo(process._id);
                return {
                    statusCode: 201,
                    error: null,
                    data: addedCarWithCurrencyInfo,
                };
            }
        } else {
            return {
                statuscode: 500,
                error: "CAR NOT ADDED",
                data: [],
            };
        }
    } else {
        return {
            statusCode: 400,
            error: "MISSING MANDATORY FIELDS",
            data: [],
        };
    }
}

export async function updateCar(id, carData){
    const car = await manager.readCarById(id);
    if(car){
        Object.entries(carData).forEach(([key, value]) => {
            car[key] = carData[key];
        });
        let process = await manager.updateCar(id, car);
        if(process){
            return {
                statusCode: 200,
                error: null,
                data: process
            }
        }else{
            return {
                statusCode: 500,
                error: "CAR NOT UPDATED",
                data: null
            }
        }
    }else{
        return {
            statusCode: 400,
            error: "CAR NOT FOUND",
            data: []
        }
    }
}

export async function deleteCar(id){
    const process = await manager.deleteById(id);
    if (process) {
        return {
            statusCode: 200,
            error: null,
            data: process
        }
    } else {
        return {
            statusCode: 400,
            error: "CAR NOT DELETED",
            data: []
        }
    }
}