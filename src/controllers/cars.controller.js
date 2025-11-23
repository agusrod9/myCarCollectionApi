import * as carsService from '../services/cars.service.js'

export async function createCar(req, res){
    try {
        const result = await carsService.createCar(req.body);
        return res.status(result.statusCode).json({error: result.error, data : result.data});
    } catch (error) {
        return res.status(500).json({error: error.message, data : []});
    }
}

export async function updateCar(req, res){
    try {
        const { id } = req.params;
        const { _id, dateAdded, userId, ...newData } = req.body;
        const result = await carsService.updateCar(id, newData);
        return res.status(result.statusCode).json({error: result.error, data: result.data})
    } catch (error) {
        throw error;
    }
}

export async function deleteCar(req,res){
    try{
        const { id } = req.params;
        const result = await carsService.deleteCar(id);
        return res.status(result.statusCode).json({error: result.error, data: result.data})
    } catch(error){
        throw error;
    }
}

