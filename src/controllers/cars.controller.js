import * as carsService from '../services/cars.service.js'

export async function createCar(req, res,){
    try {
        const result = await carsService.createCar(req.body);
        return res.status(result.statusCode).json({error: result.error, data : result.data});
    } catch (error) {
        return res.status(500).json({error: error.message, data : []});
    }
}