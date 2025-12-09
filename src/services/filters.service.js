import { carManager } from "../dao/managers/cars.manager.js";

const carsManager = new carManager()

export async function readUserAvailableFilters(userId, isFavorite){
    try {

        const filters = await carsManager.readUserAvailableFilters(userId,isFavorite);
        if(filters.availableCarMakes.length!=0 && filters.availableManufacturers.length!=0 && filters.availableScales.length!=0){
            return {
                statusCode : 200,
                error : null,
                data : filters
            }
        }
        return {
            statusCode : 200,
            error : null,
            data : []
        }
    
    } catch (error) {
        throw error;
    }
}