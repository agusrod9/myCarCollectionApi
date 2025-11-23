import { carManager } from "../dao/managers/cars.manager.js";
import { validateHexColor } from "../utils/validator.util.js";

const manager = new carManager();

export async function createCar(body) {
    try {
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
    } catch (error) {
        return {
            statusCode : 500,
            error : error.message,
            data : []
        }
    }
}

export async function readCars(params){
    try {
        const {id, make, model, manuf, userId, onlyRecent} = params
        if (id){
            const car = await manager.readCarById(id)
            if(car){
                return {
                    statusCode : 200,
                    error : null,
                    data : car
                }
            }else{
                return {
                    statusCode : 400,
                    error : "CAR NOT FOUND",
                    data : []
                }
            }
        }

        if (onlyRecent === "true" && userId) {
            let cars = await manager.readUserRecentlyAddedCars(userId);
            if(cars){
                return {
                    statusCode : 200,
                    error: null,
                    data: cars
                }
            }else{
                return {
                    statusCode : 400,
                    error : "NO CAR FOUND",
                    data : []
                }
            }
        }

        const filters = {};
        if (manuf) filters.manufacturer = { $regex: ".*" + manuf + ".*", $options: "i" };
        if (make) filters.carMake = { $regex: ".*" + make + ".*", $options: "i" };
        if (model) filters.carModel = { $regex: ".*" + model + ".*", $options: "i" };
        if (userId) filters.userId = userId;

        if (Object.keys(filters).length > 0) {
            let cars = await manager.readCarsByFilters(filters);
            if(cars){
                return {
                    statusCode : 200,
                    error: null,
                    data: cars
                }
            }else{
                return {
                    statusCode : 400,
                    error : "NO CAR MATCHES GIVEN PARAMETERS",
                    data : []
                }
            }
        }else{
            let cars = await manager.readAllCars();
            if(cars){
                return {
                    statusCode : 200,
                    error : null,
                    data : cars
                }
            } else {
                return {
                    statusCode : 400,
                    error : "NO CAR FOUND",
                    data : []
                }
            }
        }
    } catch (error) {
        return {
            statusCode : 500,
            error : error.message,
            data : []
        }
    }
}

export async function updateCar(id, carData){
    try {
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
    } catch (error) {
        return {
            statusCode : 500,
            error : error.message,
            data : []
        }
    }
}

export async function deleteCar(id){
    try {
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
    } catch (error) {
        return {
            statusCode : 500,
            error : error.message,
            data : []
        }
    }
}

