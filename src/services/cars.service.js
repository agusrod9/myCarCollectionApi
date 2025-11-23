import { carManager } from "../dao/managers/carsManager.js";
import { validateHexColor } from "../utils/validator.util.js";

const manager = new carManager();

export async function createCar(body){
    if (
        body.carMake &&
        body.carModel &&
        body.scale &&
        body.userId
    ) {
        let newCar = {...body, dateAdded: Date.now()};
        if (!validateHexColor(newCar.carColor)) {
            return {
                statusCode : 400,
                error : "COLOR MUST BE IN HEX FORMAT",
                data: []
            }
        }
        //newCar.userId = { _id: newCar.userId }; // Si falla volver a incluir
        let process = await manager.createNewCar(newCar);
        if(process){
            if(process.price===null){
                return {
                    statusCode : 201,
                    error: null,
                    data: process
                }
            }else{
                const addedCarWithCurrencyInfo = await manager.readCarWithCurrencyInfo(process._id);
                return {
                    statusCode : 201,
                    error: null,
                    data: addedCarWithCurrencyInfo
                }
            }
        }else{
            return {
                statuscode: 500,
                error: "CAR NOT ADDED",
                data: []
            }
        }
    } else {
        return{
            statusCode : 400,
            error: "MISSING MANDATORY FIELDS",
            data: [] 
        }
    }
}